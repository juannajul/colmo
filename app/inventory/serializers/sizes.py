"""Product sizes serializers."""

# Django rest framework
from rest_framework import serializers

# Models
from inventory.models.products import Sizes

class SizesModelSerializer(serializers.ModelSerializer):
    """Sizes model serializer."""

    class Meta:
        model = Sizes
        fields = '__all__'