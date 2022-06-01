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
        

class CreateBrandSerializer(serializers.ModelSerializer):
    """Create product sizes serializer."""
    size = serializers.StringRelatedField(many=True)

    class Meta:
        model = ProductSizes
        fields = '__all__'
        