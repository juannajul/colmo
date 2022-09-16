from itertools import product
from django.contrib import admin

# Models
from inventory.models.products import Category, Sizes, Brand, Product, ProductSizes
from inventory.models.discount_codes import DiscountCode
from inventory.models.sold_confirmation import SoldProduct
from inventory.models.sold_confirmation import SoldProductConfirmation

# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'sku', 'stock', 'is_active')
    list_filter = ('category', 'is_active')
    search_fields = ('name', 'sku')
    list_display_links = ('name',)
    actions = ['update_products_stock']
    
    def update_products_stock(self, request, queryset):
        products_id = queryset.values_list('id', flat=True)
        for product_id in products_id:
            sizes_qty = 0
            product = Product.objects.get(pk=product_id)
            product_sizes = ProductSizes.objects.filter(item_product_sizes=product_id)
            for size in product_sizes:
                qty_size = size.qty
                sizes_qty += qty_size
                product.stock = sizes_qty
                product.save()
    update_products_stock.short_dedscription = 'Update Products sizes stock.'

admin.site.register(Category)
admin.site.register(Sizes)
admin.site.register(Brand)

@admin.register(ProductSizes)
class ProductSizesAdmin(admin.ModelAdmin):
    search_fields = ('id',)
    
admin.site.register(DiscountCode)

@admin.register(SoldProduct)
class SoldProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name','sold_confirmation', 'product_size', 'qty')
    search_fields = ('sold_confirmation__sold_number_code',)
    list_display_links = ('name',)

@admin.register(SoldProductConfirmation)
class SoldProductConfirmationAdmin(admin.ModelAdmin):
    list_display = ('id', 'sold_number_code', 'confirmation', 'finished')
    list_filter = ('confirmation', 'finished')
    search_fields = ('id', 'sold_number_code')
    list_display_links = ('sold_number_code',)