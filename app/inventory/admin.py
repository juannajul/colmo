from django.contrib import admin

# Models
from inventory.models.products import Category, Sizes, Brand, Product, ProductSizes
from inventory.models.discount_codes import DiscountCode
from inventory.models.sold_confirmation import SoldProduct
from inventory.models.sold_confirmation import SoldProductConfirmation

# Register your models here.

admin.site.register(Category)
admin.site.register(Sizes)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(ProductSizes)
admin.site.register(DiscountCode)
admin.site.register(SoldProduct)
admin.site.register(SoldProductConfirmation)