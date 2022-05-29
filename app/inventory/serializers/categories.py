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
    
    def validate(self, data):
        """Validate if de slug already exists. If exists modificate."""
        slug_name = data['slug']
        if Category.objects.filter(slug=slug_name).exists:
            id = str(uuid.uuid4())
            new_slug_name = slugify("{}-{}".format(
                data["name"], id[:8]
            ))
            data['slug'] = new_slug_name
        return data

