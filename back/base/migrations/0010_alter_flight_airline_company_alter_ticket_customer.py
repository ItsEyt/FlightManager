# Generated by Django 4.0.5 on 2022-08-17 14:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0009_alter_profile_address_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='flight',
            name='airline_company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.profile'),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
