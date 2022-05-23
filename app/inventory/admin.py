from django.contrib import admin

# Models
from inventory.models.products import Category, ProductSizes, Brand, Product, Media

# Register your models here.

admin.site.register(Category)
admin.site.register(ProductSizes)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(Media)