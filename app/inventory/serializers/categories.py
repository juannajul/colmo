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

    slug = serializers.SlugField()

    class Meta:
        model = Category
        fields = '__all__'
  
    def validate(self, data):
        """Validate if de slug already exists. If exists modificate."""
        slug_name = data['slug']
        # if Category.objects.filter(slug=slug_name).exists():
        #     category = Category.objects.filter(slug=slug_name)
        #     if category.slug.lower() == slug_name:
        #         raise serializers.ValidationError('Slug name already exists.')
            
        data['slug'] = slug_name.lower()
        return data
