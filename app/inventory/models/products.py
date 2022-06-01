"""Inventory models."""

from django.db import models
from django.utils.translation import gettext_lazy as _

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

class Brand(models.Model):
    """Brands Model."""
    name = models.CharField(max_length=255, unique=True, verbose_name="Brand name")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Brand slug")
    description = models.TextField(max_length=450, blank=True, verbose_name="Brand descrition")
    brand_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Brand user")

    def __str__(self):
        """Return brand name"""
        return self.name

    class Meta:
        verbose_name_plural = "Brands"


class ProductSizes(models.Model):
    """Product sizes model"""
    size = models.ForeignKey(Sizes, on_delete=models.CASCADE, related_name="product_size")
    qty = models.PositiveIntegerField(default=0)

    def __str__(self):
        """Return brand name"""
        return self.size.size

    class Meta:
        verbose_name_plural = "Product sizes"


class ProductMedia(models.Model):
    """Media model."""
    
    image = models.ImageField(
        unique=False,
        null=False,
        blank=True,
        verbose_name=_("product image"),
        upload_to="media/products/",
        help_text=_("format: required, default-default.png"),
    )
    alt_text = models.CharField(
        max_length=255,
        unique=False,
        null=False,
        blank=True,
        verbose_name=_("alternative text"),
        help_text=_("format: required, max-255"), 
    ) 

    def __str__(self):
        return self.alt_text

    class Meta:
        verbose_name_plural = "Media"
    

class Product(models.Model):
    """Product model."""
    name = models.CharField(max_length=255, verbose_name="Product name")
    sku = models.CharField(max_length=20, unique=True, verbose_name= "Product sku")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Product slug")
    description = models.TextField(max_length=455, blank=True, verbose_name="Product description")
    category = models.ManyToManyField(Category, blank=True, related_name="product_categories")
    sizes = models.ManyToManyField(ProductSizes, related_name="item_product_sizes")
    images = models.ManyToManyField(ProductMedia, related_name="product_images")
    stock = models.PositiveBigIntegerField(default=0)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name="product_brand")
    made_by = models.CharField(max_length=255, verbose_name="Made by brand")
    store_price = models.DecimalField(max_digits=6, decimal_places=2)
    sale_price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        """Return brand name"""
        return self.name

    class Meta:
        verbose_name_plural = "Products"

