from ..models import Profile
from django.http import JsonResponse
from ..serializers import ProfileSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException

# Create your views here.

@api_view(['GET'])
def user(req, id=-1):
    if int(id)>-1:
        try:
            prof = Profile.objects.get(user_id = id)
            print(ProfileSerializer.ProfileInfo(prof))
            return JsonResponse(ProfileSerializer.ProfileInfo(prof),safe=False)
        except:
            return JsonResponse({"id does not exist":id})
    res = []
    for user in Profile.objects.all():
        res.append(ProfileSerializer.ProfileInfo(user))
    return JsonResponse(res,safe=False)

# currently not in use, profile gets created when registering. only need to 'PUT' when updating blank data
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addProfile(req):
    data = req.data
    try:
        print(req.user.id)
        Profile.objects.create(user_id=req.user.id, phone_number="123432123")
    except Exception as e:
        print(e)
        raise APIException(e)
    return JsonResponse({"SUCCESS":str(Profile.objects.get(user_id=req.user.id))})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delProfile(req, id=-1):
    if req.user.is_superuser:
        if int(id) > 0:
            try:
                profile2del = Profile.objects.get(user_id = id)
                profile2del.is_active = False
                profile2del.save()
            except:
                return JsonResponse({"ERROR":"cannot delete Profile"})
            return JsonResponse(ProfileSerializer.ProfileInfo(profile2del),safe=False)
        return JsonResponse({"FAILED":f"no such id: {id}"})
    return JsonResponse("not an admin!")

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def recoverProfile(req, id=-1):
    if req.user.is_superuser:
        if int(id) > 0:
            try:
                profile2recover = Profile.objects.get(user_id = id)
                profile2recover.is_active = True
                profile2recover.save()
            except Exception as e:
                return APIException(e)
            return JsonResponse(ProfileSerializer.ProfileInfo(profile2recover),safe=False)
        return JsonResponse({"FAILED":f"no such id: {id}"})
    return JsonResponse("not an admin!")

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(req):
    print('hey')
    try:
        print(req.data)
        profile2update = Profile.objects.get(user_id = req.user.id)
        profile2update.address = req.data["address"]
        profile2update.credit_card_number = req.data["credit_card"]
        profile2update.first_name = req.data["first_name"]
        profile2update.last_name = req.data["last_name"]
        profile2update.phone_number = req.data["phone"]
        profile2update.image = req.FILES['profilePic']
        profile2update.save()
    except Exception as e:
        return APIException(e)
    return JsonResponse({"Updated ":f"{profile2update.first_name} {profile2update.last_name}"})
