from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from .serializers import UserRegisterSerializer,LoginSerializer,LogoutUserSerializer
from rest_framework.response import Response
from rest_framework import status
from .utils import send_code_to_user
from rest_framework.permissions import IsAuthenticated
from .serializers import ApplicationSerializer
from .models import Applications
from rest_framework.decorators import api_view




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
        print("gate")
        return Response(status=status.HTTP_200_OK)