import profile
from ..models import Flight, Profile, Ticket
from django.http import JsonResponse
from ..serializers import TicketSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.exceptions import APIException

# Create your views here.

@api_view(['GET'])
def ticket(req, id=-1):
    if req.method == 'GET':
        if int(id)>-1:
            try:
                return JsonResponse(TicketSerializer(Ticket.objects.get(_id = id)).data)
            except:
                return JsonResponse({"id does not exist":id})
        res = []
        for tick in Ticket.objects.all():
            res.append(TicketSerializer(tick).data)
        return JsonResponse(res,safe=False)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userTickets(req):
    profile = Profile.objects.get(user = req.user)
    res = []
    for ticket in profile.ticket_set.all():
        res.append(TicketSerializer.TicketInfo(ticket))
    return JsonResponse(res, safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addTicket(req, id):
    try:
        flight = Flight.objects.get(_id = id)
        if flight.is_active:
            tick = Ticket.objects.create(customer_id = req.user.id, flight_id = flight._id)
            flight.remaining_tickets -= 1
            if flight.remaining_tickets == 0:
                flight.is_active = False
            flight.save()
    except Exception as e:
        print(e)
        raise APIException(e)
    return JsonResponse(TicketSerializer.TicketInfo(tick), safe=False)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delTicket(req, id=-1):
    if int(id) > 0:
        try:
            ticket2del = Ticket.objects.get(_id = id)
            ticket2del.is_active = False
        except:
            return JsonResponse({"ERROR":"cannot delete Ticket"})
        return JsonResponse({"DELETED":ticket2del.name})
    return JsonResponse({"FAILED":f"no such id: {id}"})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateTicket(req, id=-1):
    if int(id) > 0:
        try:
            ticket2update = Ticket.objects.get(_id = id)
            ticket2update.customer_id = req.data["customer"]
            ticket2update.flight_id = req.data["flight"]
            ticket2update.save()
        except:
            return JsonResponse({"ERROR":"cannot update Ticket"})
        return JsonResponse({"Updated ": f"{ticket2update.customer_id} - {ticket2update.flight_id}"})
    return JsonResponse({"FAILED":f"no such id: {id}"})
