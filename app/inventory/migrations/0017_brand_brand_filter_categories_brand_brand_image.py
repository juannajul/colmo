# Generated by Django 4.0.4 on 2023-02-06 19:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0016_alter_product_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='brand',
            name='brand_filter_categories',
            field=models.ManyToManyField(blank=True, related_name='brand_categories', to='inventory.category'),
        ),
        migrations.AddField(
            model_name='brand',
            name='brand_image',
            field=models.ImageField(blank=True, upload_to='media/brands/', verbose_name='brand image'),
        ),
    ]
