from ..models import User_Role
from django.http import JsonResponse
from ..serializers import UserRoleSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes

# Create your views here.

@api_view(['GET'])
def userRole(req, id=-1):
    if req.method == 'GET':
        if int(id)>-1:
            try:
                return JsonResponse(UserRoleSerializer(User_Role.objects.get(_id = id)).data)
            except:
                return JsonResponse({"id does not exist":id})
        res = []
        for userRole in User_Role.objects.all():
            res.append(UserRoleSerializer(userRole).data)
        return JsonResponse(res,safe=False)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addRole(req):
    try:
        User_Role.objects.create(role_name=req.data["role"])
    except:
        return JsonResponse({"ERROR":"cannot add Role"})
    return JsonResponse({"SUCCESS":str(User_Role.objects.get(role_name=req.data["role"]))})

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delRole(req, id=-1):
    if id > 0:
        try:
            role2del = User_Role.objects.get(_id = id)
            role2del.is_active = False
        except:
            return JsonResponse({"ERROR":"cannot delete Role"})
        return JsonResponse({"DELETED":role2del.name})
    return JsonResponse({"FAILED":f"no such id: {id}"})

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateRole(req, id=-1):
    if id > 0:
        try:
            role2update = User_Role.objects.get(_id = id)
            role2update.role_name = req.data["role"]
            role2update.save()
        except:
            return JsonResponse({"ERROR":"cannot update Role"})
        return JsonResponse({"Updated ": role2update.name})
    return JsonResponse({"FAILED":f"no such id: {id}"})
