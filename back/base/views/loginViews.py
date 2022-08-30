from django.contrib.auth.models import User
from django.http import HttpResponse, JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from base.models import Profile

class LoginTokenSer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['staff'] = user.is_staff
        token['admin'] = user.is_superuser
        return token

class LoginToken(TokenObtainPairView):
    serializer_class = LoginTokenSer

@api_view(['POST'])
def register(req):
    try:
        user = User.objects.create_user(
            username = req.data["username"],
            password = req.data["password"],
            email = req.data["email"],
        )
        Profile.objects.create(
            user_id = user.id,
            username = user.username,
        )
        return JsonResponse({'REGISTER':'SUCCESS'})
    except:
        return HttpResponse("Registiration Failed")
