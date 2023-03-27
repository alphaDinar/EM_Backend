from django.shortcuts import render
from .models import User,LogBox
from django.contrib.auth import login,authenticate
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.views import APIView,Response
from .serializers import UserSerializer
from django.views.decorators.csrf import csrf_exempt 
from django.middleware.csrf import get_token
import jwt
from django.conf import settings

def base(request):
    return render(request, 'base.html')

def base_slug(request,slug):
    return render(request, 'base.html')

def base_slug_2(request,slug,id):
    return render(request, 'base.html')

# class AuthAPI(APIView):
#     permission_classes = [AllowAny]
#     serializer_class = UserSerializer
#     def post(self, request):


class UserAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    def post(self, request):
        user = User.objects.get(username=request.data.get('username'))
        login(request,user)
        print(request.data.get('username'))
        return Response({'test':'userapi'})

def get_user(jwt_token):
    payload = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=['HS256'])
    user_id = payload.get('user_id')
    user = User.objects.get(id=user_id)
    return user

class LogoutAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def post(self,request,format=None):
        print(self.request.user)
        return Response({'test': 'good'})    