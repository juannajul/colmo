from inventory.basket.basket import Basket
from inventory.models.products import Brand

def basket(request):
    return {'basket': Basket(request)}

def brands(request):
    brands = Brand.objects.all()
    return {'brands': brands}