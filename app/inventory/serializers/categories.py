""" Category serializers. """

# Django restframework
from rest_framework import serializers

# Django
from django.utils.text import slugify
import uuid


# Models
from inventory.models.products import Category

class CategoryModelSerializer(serializers.ModelSerializer):
    """ Category model serializer."""
    
    class Meta:
        model = Category
        fields = '__all__'
  
