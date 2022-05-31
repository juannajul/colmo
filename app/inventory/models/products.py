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

    class Meta:
        verbose_name_plural = "Categories"

class ProductSizes(models.Model):
    """Products sizes model."""
    size = models.CharField(max_length=20, unique=True,verbose_name="Product size")
    size_type = models.CharField(max_length=20, blank=True, verbose_name="Size type")

    class Meta:
        verbose_name = "Product Size"
        verbose_name_plural = "Products Sizes"

class Brand(models.Model):
    """Brands Model."""
    name = models.CharField(max_length=255, unique=True, verbose_name="Brand name")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Category slug")
    description = models.TextField(max_length=450, blank=True, verbose_name="Brand descrition")
    brand_user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Brand user")

    class Meta:
        verbose_name_plural = "Brands"

class Product(models.Model):
    """Product model."""
    name = models.CharField(max_length=255, verbose_name="Product name")
    sku = models.CharField(max_length=20, unique=True, verbose_name= "Product sku")
    slug = models.SlugField(max_length=255, unique=True, verbose_name="Product slug")
    description = models.TextField(max_length=455, blank=True, verbose_name="Product description")
    category = models.ManyToManyField(Category, blank=True, related_name="product_categories")
    size = models.ManyToManyField(ProductSizes, related_name="product_size")
    stock = models.PositiveBigIntegerField(default=0)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name="product_brand")
    made_by = models.CharField(max_length=255, verbose_name="Made by brand")
    store_price = models.DecimalField(max_digits=6, decimal_places=2)
    sale_price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Products"

class Media(models.Model):
    """Media model."""
    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE,
        related_name="media_product_inventory",
    )
    image = models.ImageField(
        unique=False,
        null=False,
        blank=True,
        verbose_name=_("product image"),
        upload_to="images/",
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

    class Meta:
        verbose_name_plural = "Media"
    