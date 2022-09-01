from django.db import models

class DiscountCode(models.Model):
    """Discount code model."""
    code = models.SlugField(max_length=24, unique=True, verbose_name="Discount code")
    discount = models.PositiveIntegerField(default=0, verbose_name="Discount")
    is_active = models.BooleanField(default=True, verbose_name="Is active")

    def __str__(self):
        """Return brand name"""
        return self.code

    class Meta:
        verbose_name_plural = "Discount codes"