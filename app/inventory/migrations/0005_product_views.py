# Generated by Django 4.0.4 on 2022-08-28 09:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0004_alter_discountcode_code'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='views',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]