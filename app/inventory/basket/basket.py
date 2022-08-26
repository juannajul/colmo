from decimal import Decimal
from inventory.models.products import Product, ProductSizes


class Basket():
    """
    A base Basket class, providing some default behaviors that
    can be inherited or overrided, as necessary.
    """

    def __init__(self, request):
        self.session = request.session
        basket = self.session.get('skey')
        if 'skey' not in request.session:
            basket = self.session['skey'] = {}
        self.basket = basket

    def add(self, product, product_size_id, size, product_category):
        """
        Adding and updating the users basket session data
        """
        print(product)
        product_id = str(product['id']) 
        id_product_size = str(product_size_id)
        product_cat = str(product_category)
        product_size = ProductSizes.objects.get(id=id_product_size)
        product_size_qty = int(product_size.qty)
        p_id = str(product_id + '-' + id_product_size)
        if p_id in self.basket:
            if self.basket[p_id]['qty'] < product_size_qty:
                self.basket[p_id]['qty'] += 1
            else:
                self.basket[p_id]['qty'] = self.basket[p_id]['qty']
        elif product['is_sale_price_active'] == True:
            self.basket[p_id] = {
                'product_size_id': id_product_size,
                'size': str(size),
                'product_category': str(product_cat),
                'price': product['store_price'],
                'sale_price': product['sale_price'],
                'is_sale_price_active': product['is_sale_price_active'],
                'qty': 1,
                'product_size_qty': product_size_qty
            }
        else:
            self.basket[p_id] = {
             'price': str(product['store_price']),
             'sale_price': str(product['sale_price']),
             'is_sale_price_active': product['is_sale_price_active'],
             'qty': 1, 
             'product_category': str(product_cat),
             'size': str(size),
             'product_size_qty': product_size_qty,
             'product_size_id': id_product_size,
             }
        self.save()

    def __iter__(self):
        """
        Collect the product_id in the session data to query the database 
        and return products.
        """
        product_ids = self.basket.keys()
        p_id = []
        for product_id in product_ids:
            product_id = product_id.split('-')
            p_id.append(int(product_id[0]))
        products = Product.objects.filter(id__in=p_id)
        basket = self.basket.copy()

        for product in products:
            for product_id in product_ids:
                product_id = product_id.split('-')
                if product_id[0] == str(product.id):
                    basket[f'{product_id[0]}-{product_id[1]}']['product'] = product
        for item in basket.values():
            #print(item)
            item['price'] = Decimal(item['price'])
            item['total_price'] = item['price'] * item['qty']
            yield item
        #print(item)

    def __len__(self):
        """
        Get the basket data and count the qty of items
        """
        return sum(item['qty'] for item in self.basket.values())

    def get_total_price(self):
        #print(self.basket.values())
        total_price = 0
        for item in self.basket.values():
            if item['is_sale_price_active']:
                total_price += Decimal(item['sale_price']) * item['qty']
            else:
                total_price += Decimal(item['price']) * item['qty']
        return total_price

    def delete(self, product, product_size_id):
        """
        Delete item from session data
        """
        product_id = str(product)
        product_size = str(product_size_id)
        product_delete_id = str(product_id + '-' + product_size)

        if product_delete_id in self.basket:
            del self.basket[product_delete_id]
            self.save()

    def update(self, product, product_size_id, qty):
        """
        Update values in session data
        """
        
        product_id = str(product)
        product_size = str(product_size_id)
        product_update_id = str(product_id + '-' + product_size)

        if product_update_id in self.basket:
            self.basket[product_update_id]['qty'] = int(qty)
        
        self.save()

    def refresh_basket(self):
        """
        Update the basket session data to reflect any changes made
        """
        print("refresh_basket")
        print(self.basket.keys())
        basket_keys = self.basket.keys()
        for key in basket_keys:
            product_id = key.split('-')
            product_size = ProductSizes.objects.get(id=product_id[1])
            product_size_qty = int(product_size.qty)
            self.basket[key]['product_size_qty'] = product_size_qty
            if self.basket[key]['qty'] > product_size_qty:
                self.basket[key]['qty'] = product_size_qty
            product = Product.objects.get(id=product_id[0])
            self.basket[key]['price'] = str(product.store_price)
            self.basket[key]['sale_price'] = str(product.sale_price)
            self.basket[key]['is_sale_price_active'] = product.is_sale_price_active
        self.save()

    def save(self):
        self.session.modified = True
