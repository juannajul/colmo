# Generated by Django 4.0.4 on 2022-08-31 16:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0010_soldproduct_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='soldproduct',
            name='size',
            field=models.CharField(blank=True, default='', max_length=24),
        ),
    ]