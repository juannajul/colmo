"""Inventory Urls"""

# Django rest framework
from rest_framework.routers import DefaultRouter

#Django
from django.urls import path, include

# Views
from .views import categories as category_views
from .views import product_sizes as product_sizes_views
from .views import brands as brands_views

router = DefaultRouter()
router.register(r'categories', category_views.CategoryViewSet, basename="category")
router.register(r'product_sizes', product_sizes_views.ProductSizesViewSet, basename="product_sizes")
router.register(r'brands', brands_views.BrandViewSet, basename="brand")

urlpatterns = [
    path('', include(router.urls))
]