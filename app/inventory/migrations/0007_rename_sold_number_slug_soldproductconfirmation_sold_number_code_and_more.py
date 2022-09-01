# Generated by Django 4.0.4 on 2022-08-31 07:52

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0006_soldproduct_soldproductconfirmation'),
    ]

    operations = [
        migrations.RenameField(
            model_name='soldproductconfirmation',
            old_name='sold_number_slug',
            new_name='sold_number_code',
        ),
        migrations.RemoveField(
            model_name='soldproductconfirmation',
            name='sold_product',
        ),
        migrations.AddField(
            model_name='soldproductconfirmation',
            name='discount',
            field=models.CharField(blank=True, max_length=20, verbose_name='discount'),
        ),
        migrations.AddField(
            model_name='soldproductconfirmation',
            name='sold_products',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.DO_NOTHING, related_name='sold_product_confirmation', to='inventory.soldproduct'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='soldproductconfirmation',
            name='total_amount',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=7),
        ),
    ]
