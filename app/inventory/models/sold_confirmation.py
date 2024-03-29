from django.db import models
from inventory.models.products import Product, ProductSizes
from users.models.users import User


class SoldProductConfirmation(models.Model):
    """Sold confirmation mail model."""
    sold_number_code = models.SlugField(max_length=24, unique=True,verbose_name="Product number confirmation slug")
    total_amount = models.DecimalField(max_digits=7, decimal_places=2, default=0)
    discount = models.CharField(max_length=20, blank=True, verbose_name= "discount")
    confirmation =models.BooleanField(default=False)
    finished = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Confirmation {self.sold_number_code}'

class SoldProduct(models.Model):
    """Sold product model."""
    name = models.CharField(max_length=255, blank=True)
    slug = models.CharField(max_length=255, blank=True)
    sku = models.CharField(max_length=255, blank=True)
    size = models.CharField(max_length=54, blank=True)
    sold_confirmation = models.ForeignKey(SoldProductConfirmation, on_delete=models.CASCADE, related_name="sold_product_confirmation")
    product_size = models.ForeignKey(ProductSizes, on_delete=models.DO_NOTHING, related_name="product_size_sold")
    qty = models.PositiveIntegerField(default=0, blank=False)

    def __str__(self):
        return  self.name
