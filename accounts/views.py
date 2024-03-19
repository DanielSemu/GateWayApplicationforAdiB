from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import  UserRegisterSerializer,LoginSerializer,LogoutUserSerializer,ApplicationSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_code_to_user
from rest_framework.permissions import IsAuthenticated
from .serializers import ApplicationSerializer
from .models import Applications
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from .models import Applications,App_Category
from .serializers import ApplicationSerializer



@api_view(["GET", "POST"])
def getApplications(request):
    if request.method =='GET':
        # return getNotes(request)
        notes =Applications.objects.all()
        serializer=ApplicationSerializer(notes, many=True)
        return Response(serializer.data)

class RegisterUserView(GenericAPIView):
    serializer_class=UserRegisterSerializer

    def post(self, request):
        user_data=request.data
        serializer=self.serializer_class(data=user_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            user=serializer.data
            send_code_to_user(user['email'])

            return Response({
                'data':user,
                'message':f'hi  thanks for signing up a passcode'
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer
    def post(self,request):
        serializer=self.serializer_class(data=request.data ,context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TestAuthenticationView(GenericAPIView):
    permission_classes=[IsAuthenticated]

    def get(self, request):
        data={
            'msg':'It Works'
        }
        return Response(data, status=status.HTTP_200_OK)
    
class LogoutUserView(GenericAPIView):
    serializer_class=LogoutUserSerializer
    permission_classes=[IsAuthenticated]

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_200_OK)
    
class ApplicationCreateView(APIView):
    query_set=Applications.objects.all()
    serializer_class = ApplicationSerializer()
    def post(self, request, *args ,**kwargs):
        app_name=request.data["app_name"]
        image=request.data["image"]
        url=request.data["url"]
        app_category=request.data["app_category"]
        description=request.data["description"]
        category =App_Category.objects.get(category=app_category)
        Applications.objects.create(app_name=app_name,image=image,url=url,app_category=category,description=description)
        return Response(status=status.HTTP_200_OK)