from django.urls import path

from . import views

app_name = 'colmo'

urlpatterns = [
    path('', views.index, name="index"),
    path('product/<str:slug>/', views.product_retrieve, name="product_retrieve"),
]