"""Inventory models."""

from distutils.command.upload import upload
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.dispatch import receiver

# Models
from users.models.users import User

class Category(models.Model):
    """Category model."""
    name = models.CharField(max_length=255, unique=True, verbose_name="Category name")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Category slug")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        """Return brand name"""
        return self.name

    class Meta:
        verbose_name_plural = "Categories"

class Sizes(models.Model):
    """Sizes model."""
    size = models.CharField(max_length=20, unique=True,verbose_name="Size")
    size_type = models.CharField(max_length=20, blank=True, verbose_name="Size type")

    def __str__(self):
        """Return brand name"""
        return self.size

    class Meta:
        verbose_name = "Sizes"
        verbose_name_plural = "Sizes"
        ordering = ["pk"]

class Brand(models.Model):
    """Brands Model."""
    name = models.CharField(max_length=255, unique=True, verbose_name="Brand name")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Brand slug")
    description = models.TextField(max_length=450, blank=True, verbose_name="Brand descrition")
    brand_image = models.ImageField(blank=True, upload_to="media/brands/", verbose_name="brand image", default='None')
    brand_filter_categories = models.ManyToManyField(Category, blank=True, related_name="brand_categories")
    brand_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Brand user")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        """Return brand name"""
        return self.name

    class Meta:
        verbose_name_plural = "Brands"
        ordering = ["pk"]

@receiver(models.signals.post_delete, sender=Brand)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Document` object is deleted.
    """
    if instance.brand_image:
        instance.brand_image.delete(False)


class ProductSizes(models.Model):
    """Product sizes model"""
    size = models.ForeignKey(Sizes, on_delete=models.CASCADE, related_name="product_size")
    qty = models.PositiveIntegerField(default=0)

    def __str__(self):
        """Return brand name"""
        return f'{self.id} | Size: {self.size}, Qty: {self.qty}'
    class Meta:
        verbose_name_plural = "Product sizes" 

class Product(models.Model):
    """Product model."""
    name = models.CharField(max_length=255, verbose_name="Product name")
    sku = models.CharField(max_length=20, unique=True, verbose_name= "Product sku")
    slug = models.SlugField(max_length=255, unique=False, verbose_name="Product slug")
    description = models.TextField(max_length=455, blank=True, verbose_name="Product description")
    category = models.ManyToManyField(Category, blank=True, related_name="product_categories")
    sizes = models.ManyToManyField(ProductSizes, related_name="item_product_sizes", null=True, blank=True)
    color = models.CharField(max_length=55, blank=True)
    image = models.ImageField(blank=True, upload_to="media/products/", verbose_name="product image")
    image2 = models.ImageField(blank=True, upload_to="media/products/", verbose_name="product image 2")
    image3 = models.ImageField(blank=True, upload_to="media/products/", verbose_name="product image 3")
    stock = models.PositiveBigIntegerField(default=0)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name="product_brand")
    made_by = models.CharField(max_length=255, verbose_name="Made by brand")
    store_price = models.DecimalField(max_digits=6, decimal_places=2)
    sale_price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, default=0)
    is_sale_price_active = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    views = models.PositiveBigIntegerField(default=0)

    def __str__(self):
        """Return brand name"""
        return self.name
    
    class Meta:
        verbose_name_plural = "Products"
        ordering = ["-created_at"]
    

@receiver(models.signals.post_delete, sender=Product)
def auto_delete_file_on_delete(sender, instance, **kwargs):
    """
    Deletes file from filesystem
    when corresponding `Document` object is deleted.
    """
    if instance.image:
        instance.image.delete(False)
    if instance.image2:
        instance.image2.delete(False)
    if instance.image3:
        instance.image3.delete(False)



            
    