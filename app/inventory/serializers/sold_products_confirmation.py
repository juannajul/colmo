""" Sold Product Confirmation serializers. """

# Django restframework
from rest_framework import serializers

# Django
from django.utils.text import slugify
import uuid

# Models
from inventory.models.sold_confirmation import SoldProductConfirmation

class SoldProductConfirmationModelSerializer(serializers.ModelSerializer):
    """ Sold product model serializer."""

    class Meta:
        model = SoldProductConfirmation
        fields = '__all__'


class CreateSoldProductConfirmationModelSerializer(serializers.ModelSerializer):
    """ Sold product model serializer."""

    class Meta:
        model = SoldProductConfirmation
        fields = '__all__'

    def validate(self, data):
        """Validate if slug already exists. If exists modificate."""
        slug_name = data['sold_number_code']
        id = str(uuid.uuid4())
        new_slug_name = slugify("{}-{}".format(
            data["sold_number_code"], id[:8]
        ))
        data['sold_number_code'] = new_slug_name
        if SoldProductConfirmation.objects.filter(sold_number_code=slug_name).exists():
            id = str(uuid.uuid4())
            new_slug_name = slugify("{}-{}".format(
                data["sold_number_code"], id[:8]
            ))
            data['sold_number_code'] = new_slug_name
            
        data['sold_number_code'] = new_slug_name
        return data

