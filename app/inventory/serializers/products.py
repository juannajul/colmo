"""Products serializer."""

# Django rest framework
from rest_framework import serializers

# Models
from inventory.models.products import Product

# Serializers
from inventory.serializers.product_sizes import ProductSizesModelSerializer

class ProductModelSerializer(serializers.ModelSerializer):
    """Product model serializer."""
    category = serializers.StringRelatedField(many=True)
    brand = serializers.StringRelatedField()
    sizes = ProductSizesModelSerializer(many=True)
    images = serializers.StringRelatedField(many=True)
    

    class Meta:
        model = Product
        fields = '__all__'
        
"""
class CreateProductSerializer(serializers.ModelSerializer):
    #Create product serializer.
    brand_user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Product
        fields = []
        """
        