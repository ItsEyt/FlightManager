from ..models import Flight, Profile
from django.http import JsonResponse
from ..serializers import FlightSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException

# Create your views here.

@api_view(['GET'])
def flight(req, id=-1):
    if int(id)>-1:
        try:
            return JsonResponse(FlightSerializer.FlightInfo(Flight.objects.get(_id = id)))
        except:
            return JsonResponse({"id does not exist":id})
    res = []
    for fly in Flight.objects.all():
        if req.user.is_superuser or fly.is_active:
            res.append(FlightSerializer.FlightInfo(fly))
    return JsonResponse(res,safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getFlightByAirline(req):
    airline = Profile.objects.get(user = req.user)
    res = []
    try:
        for fly in airline.flight_set.all():
            if fly.is_active:
                res.append(FlightSerializer.FlightInfo(fly))
    except:
        return JsonResponse({"id does not exist":req.user.id})
    return JsonResponse(res, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addFlight(req):
    if req.user.is_staff:
        user = req.user
        data = req.data
        print(data["origin"]["_id"])
        print(user.id)
        try:
            thisflight = Flight.objects.create(airline_company_id=user.id, origin_country_id=data["origin"]["_id"],destination_country_id=data["destination"]["_id"],
                                departure_time=data["departure"],landing_time=data["landing"],remaining_tickets=data["tickets"])
        except Exception as e:
            raise APIException(e)
        return JsonResponse(FlightSerializer.FlightInfo(thisflight), safe=False)
    return JsonResponse({"ERROR":"NOT AN AIRLINE COMPANY"})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delFlight(req, id=-1):
    if int(id) > 0:
        try:
            flight2del = Flight.objects.get(_id = id)
            flight2del.is_active = False
            flight2del.save()
        except Exception as e:
            raise APIException(e)
        return JsonResponse(FlightSerializer.FlightInfo(flight2del), safe=False)
    return JsonResponse({"FAILED":f"no such id: {id}"})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def recoverFlight(req, id=-1):
    if int(id) > 0:
        try:
            flight2del = Flight.objects.get(_id = id)
            flight2del.is_active = True
            flight2del.save()
        except Exception as e:
            raise APIException(e)
        return JsonResponse(FlightSerializer.FlightInfo(flight2del), safe=False)
    return JsonResponse({"FAILED":f"no such id: {id}"})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateFlight(req, id=-1):
    print("got to update")
    if int(id) > 0:
        data = req.data
        try:
            flight2update = Flight.objects.get(_id = id)
            flight2update.origin_country_id = data["origin"]["_id"]
            flight2update.destination_country_id = data["destination"]["_id"]
            flight2update.departure_time = data["departure"]
            flight2update.landing_time = data["landing"]
            flight2update.remaining_tickets = data["tickets"]
            flight2update.save()
        except Exception as e:
            print(e)
            raise APIException(e)
        return JsonResponse(FlightSerializer.FlightInfo(flight2update), safe=False)
    return JsonResponse({"FAILED":f"no such id: {id}"})
