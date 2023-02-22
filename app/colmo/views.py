from django.shortcuts import render
from inventory.models.products import Brand
from users.models.users import User

from inventory.models.sold_confirmation import SoldProduct, SoldProductConfirmation

# Create your views here.

def index(request):
   # colmo_brand = Brand.objects.get(slug='colmo')
    #colmo_user = colmo_brand.brand_user
    #print(colmo_user.username)
    return render(request, '../templates/colmo/index.html')

def product_retrieve(request, slug):
    product_slug = slug
    return render(request, '../templates/colmo/product_retrieve.html', {
        'product_slug': product_slug
        })

def basket(request):
    return render(request, '../templates/colmo/basket.html')

def list_products(request, slug):
    return render(request, '../templates/colmo/products.html', {
        'slug': slug
    })

def list_brands_products(request, brand_slug):
    brand = Brand.objects.get(slug=brand_slug)
    brand_principal_categories = brand.brand_filter_categories.all()
    print(brand_principal_categories)
    brand_name = brand.name
    return render(request, '../templates/brands/brand_products.html', {
        'brand_name': brand_name,
        'brand_slug': brand_slug,
        'brand_categories': brand_principal_categories,
    })

def login(request):
    return render(request, '../templates/users/login.html')

def colmo_confirmation(request):
    colmo_brand = Brand.objects.get(slug='colmo')
    colmo_user = colmo_brand.brand_user
    print(colmo_user.username)
    return render(request, '../templates/colmo/sold_confirmation.html', {
        "master_user": colmo_user
    })