"""Brands serializers."""

# Django rest framework
from rest_framework import serializers

# Models
from inventory.models.products import Brand

class BrandModelSerializer(serializers.ModelSerializer):
    """Brand model serializer."""
    brand_filter_categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = Brand
        fields = '__all__'
        

class CreateBrandSerializer(serializers.ModelSerializer):
    """Create brand serializer."""
    brand_user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Brand
        fields = ('name', 'slug', 'description', 'brand_user')
        