""" Sold Product serializers. """

# Django restframework
from rest_framework import serializers

# Models
from inventory.models.sold_confirmation import SoldProduct

class SoldProductModelSerializer(serializers.ModelSerializer):
    """ Sold product model serializer."""

    class Meta:
        model = SoldProduct
        fields = '__all__'
  
