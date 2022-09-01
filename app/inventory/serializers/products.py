"""Products serializer."""

# Django rest framework
from rest_framework import serializers

# Django
from django.utils.text import slugify
import uuid

# Models
from inventory.models.products import Product, Category, Brand, Sizes, ProductSizes
from users.models import User


# Serializers
from inventory.serializers.product_sizes import ProductSizesModelSerializer, CreateProductSizesSerializer
from inventory.serializers.categories import CategoryModelSerializer
from inventory.serializers.product_sizes import CreateProductSizesSerializer

class ProductModelSerializer(serializers.ModelSerializer):
    """Product model serializer."""
    category = serializers.StringRelatedField(many=True)
    brand = serializers.StringRelatedField()
    sizes = ProductSizesModelSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'


class CreateProductSerializer(serializers.ModelSerializer):
    #Create product serializer.
    brand = serializers.HiddenField(default=serializers.CurrentUserDefault())
    sizes = CreateProductSizesSerializer(many=True)

    class Meta:
        model = Product
        fields = '__all__'
    
    def validate(self, data):
        """Validate if de slug already exists. If exists modificate."""

        slug_name = data['slug']
        if Product.objects.filter(slug=slug_name).exists():
            id = str(uuid.uuid4())
            new_slug_name = slugify("{}-{}".format(
                data["name"], id[:8]
            ))
            data['slug'] = new_slug_name
        return data

    def create(self, data):
        """Create single product."""
        user = self.context['request'].user
        brand_user = Brand.objects.get(brand_user=user)        
        data['brand'] = brand_user
        product = Product.objects.create(
            name=data['name'], sku=data['sku'],
            slug=data['slug'], brand=data['brand'],
            color=data['color'], made_by=data['made_by'],
            store_price=data['store_price'], sale_price=data['sale_price'],
            is_sale_price_active=data['is_sale_price_active']
        )
        product.save()
        categories = data['category']
        for cat in categories:
            product.category.add(cat)
        product_sizes = data['sizes']
        for size in product_sizes:
            product_size = ProductSizes.objects.create(size=size['size'], qty=size['qty'])
            product.sizes.add(product_size)
        product_stock = ProductSizes.objects.filter(item_product_sizes=product.id)
        stock = 0
        for size in product_stock:
            stock += size.qty
        product.stock = stock
        product.save()
        return data

            # cambiar models y que product sizes tenga como foreignkey a product
            #new arrivals. fecah de creacion del producto
            # filtros Creo que se deria hacer modelo para creacion de filtros
            # las tallas s=dsiponibles 
            #actvivar descuentos
            # dia epecifico activar descuento a usuarios con mas de 5 productos dentro del carrito
            #no permitir category slug en mayusculas
    
    

