""" Category serializers. """

# Django restframework
from dataclasses import field
from rest_framework import serializers

# Models
from inventory.models.products import Category

class CategoryModelSerializer(serializers.ModelSerializer):
    """ Category model serializer."""
    
    class Meta:
        model = Category
        field = '__all__'