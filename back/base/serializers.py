from .models import Country, Flight, Profile, Ticket, User_Role
from rest_framework.serializers import ModelSerializer


class CountrySerializer(ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'
    
    # def CountryInfo(self):
    #     return {
    #         "id": self._id,
    #         "name": self.name
    #     }

# class AirlineCompanySerializer(ModelSerializer):
#     class Meta:
#         model = AirlineCompany
#         fields = '__all__'

#     def AirlineInfo(self):
#         return {
#             "id": self._id,
#             "name":  self.name,
#             "country": CountrySerializer(self.country).data
#         }

class FlightSerializer(ModelSerializer):
    class Meta:
        model = Flight
        fields = '__all__'

    def FlightInfo(self):
        return {
            "id": self._id,
            "airline company":  ProfileSerializer(self.airline_company).data,
            "origin country": CountrySerializer(self.origin_country).data,
            "destination country": CountrySerializer(self.destination_country).data,
            "departure time": self.departure_time,
            "landing time": self.landing_time,
            "remaining tickets": self.remaining_tickets,
            "is active": self.is_active
        }

class TicketSerializer(ModelSerializer):
    class Meta:
        model = Ticket
        fields = '__all__'

    def TicketInfo(self):
        return {
            "id": self._id,
            "flight":  FlightSerializer.FlightInfo(self.flight),
            "customer": ProfileSerializer.ProfileInfo(self.customer)
        }

class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
    
    def ProfileInfo(self):
        return {
            "id": self.user_id,
            "address": self.address,
            "username":  self.username,
            "email": self.user.email,
            "profilePic": self.image.url,
            "firstname": self.first_name,
            "lastname": self.last_name,
            "phone_number": self.phone_number,
            "is_active": self.is_active,
            "user_role": UserRoleSerializer(self.user_role).data
        }

class UserRoleSerializer(ModelSerializer):
    class Meta:
        model = User_Role
        fields = '__all__'

    # def UserRoleInfo(self):
    #     return {
    #         "id": self._id,
    #         "role name": self.role_name
    #     }