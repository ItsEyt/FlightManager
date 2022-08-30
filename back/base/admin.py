from django.contrib import admin
from .models import Country, Flight, Ticket, User_Role, Profile

# Register your models here.

class FlightAdmin(admin.ModelAdmin):
    # a list of displayed columns name.
    list_display = ['_id', 'airline_company','origin_country', 'destination_country', 'departure_time', 'landing_time']


admin.site.register(Country)
admin.site.register(Flight, FlightAdmin)
admin.site.register(Ticket)
admin.site.register(Profile)
admin.site.register(User_Role)
