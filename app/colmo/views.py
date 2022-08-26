from django.shortcuts import render

# Create your views here.

def index(request):
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

def login(request):
    return render(request, '../templates/users/login.html')