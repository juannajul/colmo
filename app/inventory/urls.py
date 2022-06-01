"""Inventory Urls"""

# Django rest framework
from rest_framework.routers import DefaultRouter

#Django
from django.urls import path, include

# Views
from .views import categories as category_views
from .views import sizes as sizes_views
from .views import brands as brands_views
from .views import products as products_views

router = DefaultRouter()
router.register(r'categories', category_views.CategoryViewSet, basename="category")
router.register(r'sizes', sizes_views.SizesViewSet, basename="sizes")
router.register(r'brands', brands_views.BrandViewSet, basename="brand")
router.register(r'products', products_views.ProductViewSet, basename="product")
urlpatterns = [
    path('', include(router.urls))
]