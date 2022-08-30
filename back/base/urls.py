"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path
from .views import airlineViews, countryViews, flightViews, profileViews, ticketViews, userRoleViews, loginViews

urlpatterns = [
    # Home URL
    path('',countryViews.index ,name='home'),

    # Country URLs
    path('country/',countryViews.country),
    path('addcountry/',countryViews.addCountry),
    path('country/<str:id>',countryViews.country),
    path('delcountry/<str:id>',countryViews.delCountry),
    path('updatecountry/<str:id>',countryViews.updateCountry),
    path('recovercountry/<str:id>',countryViews.recoverCountry),

    # Airline URLs
    # path('airline/',airlineViews.airline),
    # path('addairline/',airlineViews.addAirline),
    # path('airline/<str:id>',airlineViews.airline),
    # path('delairline/<str:id>',airlineViews.delAirline),
    # path('updateairline/<str:id>',airlineViews.updateAirline),

    # Ticket URLs
    path('ticket/',ticketViews.ticket),
    path('ticket/<str:id>',ticketViews.ticket),
    path('usertickets/',ticketViews.userTickets),
    path('addticket/<str:id>',ticketViews.addTicket),
    path('delticket/<str:id>',ticketViews.delTicket),
    path('updateticket/<str:id>',ticketViews.updateTicket),

    # User_Role URLs
    path('role/',userRoleViews.userRole),
    path('addrole/',userRoleViews.addRole),
    path('role/<str:id>',userRoleViews.userRole),
    path('delrole/<str:id>',userRoleViews.delRole),
    path('updaterole/<str:id>',userRoleViews.updateRole),


    # User/Profile URLs
    path('profile/',profileViews.user),
    path('profile/<str:id>',profileViews.user),
    path('addprofile/',profileViews.addProfile),
    path('updateprofile/',profileViews.updateProfile),
    path('delprofile/<str:id>',profileViews.delProfile),
    path('recoverprofile/<str:id>',profileViews.recoverProfile),
    

    # Flight URLs
    path('flight/',flightViews.flight),
    path('addflight/',flightViews.addFlight),
    path('flight/<str:id>',flightViews.flight),
    path('delflight/<str:id>',flightViews.delFlight),
    path('updateflight/<str:id>',flightViews.updateFlight),
    path('flightbyairline/',flightViews.getFlightByAirline),
    path('recoverflight/<str:id>',flightViews.recoverFlight),

    # Authentication
    path('register/',loginViews.register),
    path('login/',loginViews.LoginToken.as_view(), name = 'login'),
]

