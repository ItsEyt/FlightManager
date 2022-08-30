from email.policy import default
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Country(models.Model):
    class Meta:
        verbose_name_plural = "Countries"

    _id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=50)
    image = models.ImageField(upload_to="static", default="placeholder.png")
    is_active = models.BooleanField(default=True, null=False)
    
    def __str__(self):
        return self.name

# deprecated. using is_staff to declare airlines
class User_Role(models.Model):
    _id = models.BigAutoField(primary_key=True)
    role_name = models.CharField(max_length=50)
    is_active = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.role_name

class Profile(models.Model):
    user = models.OneToOneField(User, primary_key=True, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="pfp", default="placeholder.png")
    username = models.CharField(max_length=50, unique=True, blank=False, null=False)
    user_role = models.ForeignKey(User_Role, on_delete=models.CASCADE, default=2) # customer id = 2 
    address = models.CharField(max_length=50, null=True, default='',blank=True)
    phone_number = models.CharField(max_length=50, unique=True, null=True, default='',blank=True)
    credit_card_number = models.CharField(max_length=50, null=True, default='',blank=True)
    first_name = models.CharField(max_length=50, null=True, default='',blank=True)
    last_name = models.CharField(max_length=50, null=True, default='',blank=True)
    is_active = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.username

class Flight(models.Model):
    _id = models.BigAutoField(primary_key=True)
    airline_company = models.ForeignKey(Profile, on_delete=models.CASCADE)
    origin_country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="origin_country")
    destination_country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name="destination_country")
    departure_time = models.DateTimeField()
    landing_time = models.DateTimeField()
    remaining_tickets = models.IntegerField()
    is_active = models.BooleanField(default=True, null=False)

class Ticket(models.Model):
    _id = models.BigAutoField(primary_key=True)
    flight = models.ForeignKey(Flight, on_delete=models.CASCADE)
    customer = models.ForeignKey(Profile, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True, null=False)

    def __str__(self):
        return self.flight