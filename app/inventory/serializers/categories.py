""" Category serializers. """

# Django restframework
from rest_framework import serializers

# Models
from inventory.models.products import Category

class CategoryModelSerializer(serializers.ModelSerializer):
    """ Category model serializer."""
    model = Category
    pass