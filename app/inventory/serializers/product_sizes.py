"""Product sizes serializers."""

# Django rest framework
from rest_framework import serializers

# Models
from inventory.models.products import ProductSizes

class ProductSizesModelSerializer(serializers.ModelSerializer):
    """Product sizes model serializer."""

    class Meta:
        model = ProductSizes
        fields = '__all__'
        

class CreateProductSizesSerializer(serializers.ModelSerializer):
    """Create product sizes serializer."""
    #size = serializers.StringRelatedField()

    class Meta:
        model = ProductSizes
        fields = ('size', "qty")
        