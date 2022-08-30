# from ..models import AirlineCompany
# from django.http import JsonResponse
# from ..serializers import AirlineCompanySerializer
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes

# # Create your views here.

# @api_view(['GET'])
# def airline(req, id=-1):
#     if int(id)>-1:
#         try:
#             return JsonResponse(AirlineCompanySerializer(AirlineCompany.objects.get(_id = id)).data)
#         except:
#             return JsonResponse({"id does not exist":id})
#     res = []
#     for airline in AirlineCompany.objects.all():
#         res.append(AirlineCompanySerializer(airline).data)
#     return JsonResponse(res,safe=False)

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def addAirline(req):
#     data = req.data
#     print(data["user"])
#     try:
#         AirlineCompany.objects.create(name=data["name"], country_id=data["country"], user_id=data["user"])
#     except:
#         return JsonResponse({"ERROR":"cannot add Airline Company"})
#     return JsonResponse({"SUCCESS":str(AirlineCompany.objects.get(name=data["name"]))})

# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delAirline(req, id=-1):
#     if id > 0:
#         try:
#             airline2del = AirlineCompany.objects.get(_id = id)
#             airline2del.is_active = False
#         except:
#             return JsonResponse({"ERROR":"cannot delete country"})
#         return JsonResponse({"DELETED":airline2del.name})
#     return JsonResponse({"FAILED":f"no such id: {id}"})

# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def updateAirline(req, id=-1):
#     if id > 0:
#         try:
#             airline2update = AirlineCompany.objects.get(_id = id)
#             airline2update.name = req.data["name"]
#             airline2update.country_id = req.data["country"]
#             airline2update.user_id = req.data["user"]
#             airline2update.save()
#         except:
#             return JsonResponse({"ERROR":"cannot delete country"})
#         return JsonResponse({"Updated ": airline2update.name})
#     return JsonResponse({"FAILED":f"no such id: {id}"})