from django.contrib import admin

# Models
from inventory.models.products import Category, Sizes, Brand, Product, Media, ProductSizes

# Register your models here.

admin.site.register(Category)
admin.site.register(Sizes)
admin.site.register(Brand)
admin.site.register(Product)
admin.site.register(Media)
admin.site.register(ProductSizes)