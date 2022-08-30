from ..models import Country
from django.http import JsonResponse
from ..serializers import CountrySerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException

# Create your views here.

def index(req):
    return JsonResponse({"country":"success"})

@api_view(['GET'])
def country(req, id=-1):
    if int(id)>-1:
        try:
            return JsonResponse(CountrySerializer(Country.objects.get(_id = id)).data)
        except:
            return JsonResponse({"id does not exist":id})
    res = []
    for countr in Country.objects.all():
        if req.user.is_superuser or countr.is_active:
            res.append(CountrySerializer(countr).data)
    return JsonResponse(res,safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCountry(req):
    try:
        Country.objects.create(name=req.data["name"])
    except:
        return JsonResponse({"ERROR":"cannot add country"})
    return JsonResponse({"SUCCESS":str(Country.objects.get(name=req.data["name"]))})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delCountry(req, id=-1):
    if req.user.is_superuser:
        if int(id) > 0:
            try:
                country2del = Country.objects.get(_id = id)
                country2del.is_active = False
                country2del.save()
            except Exception as e:
                return APIException(e)
            return JsonResponse(CountrySerializer(country2del).data, safe=False)
        return JsonResponse({"FAILED":f"no such id: {id}"})
    return JsonResponse("not an admin!")

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def recoverCountry(req, id=-1):
    if req.user.is_superuser:
        if int(id) > 0:
            try:
                country2recover = Country.objects.get(_id = id)
                country2recover.is_active = True
                country2recover.save()
            except Exception as e:
                return APIException(e)
            return JsonResponse(CountrySerializer(country2recover).data, safe=False)
        return JsonResponse({"FAILED":f"no such id: {id}"})
    return JsonResponse("not an admin!")

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateCountry(req, id=-1):
    user = req.user
    if user.is_superuser:
        if id > 0:
            try:
                country2update = Country.objects.get(_id = id)
                country2update.name = req.data["name"]
                country2update.save()
            except:
                return JsonResponse({"ERROR":"cannot update country"})
            return JsonResponse({"Updated ": country2update.name})
        return JsonResponse({"FAILED":f"no such id: {id}"})
    return JsonResponse("not an admin!")
