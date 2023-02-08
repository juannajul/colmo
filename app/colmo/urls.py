from django.urls import path

from . import views

app_name = 'colmo'

urlpatterns = [
    path('', views.index, name="index"),
    path('product/<str:slug>/', views.product_retrieve, name="product_retrieve"),
    path('products/<str:slug>/', views.list_products, name="list_products"),
    path('basket/', views.basket, name="basket"),
    path('login/', views.login, name="login"),
    path('colmo/confirmation', views.colmo_confirmation, name='colmo_confirmation'),
    path('brands/<str:brand_slug>', views.list_brands_products, name='list_brand_products')
]