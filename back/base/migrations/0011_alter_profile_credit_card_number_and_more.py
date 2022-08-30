# Generated by Django 4.0.5 on 2022-08-17 14:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0010_alter_flight_airline_company_alter_ticket_customer'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='credit_card_number',
            field=models.CharField(blank=True, default='', max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='ticket',
            name='customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='base.profile'),
        ),
    ]