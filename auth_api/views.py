from django.shortcuts import render,redirect
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
    return render(request, 'dist/index.html')

def base_slug(request,slug):
    return render(request, 'dist/index.html')

def base_slug_2(request,slug,id):
    return render(request, 'dist/index.html')

# class AuthAPI(APIView):
#     permission_classes = [AllowAny]
#     serializer_class = UserSerializer
#     def post(self, request):


class UserAPI(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()
    def post(self, request):
        jwt_token = request.data.get('access_token')
        refresh_token = request.data.get('refresh_token')
        user = User.objects.get(id=get_user(jwt_token).id)
        return Response({'user_id':user.id,'user':user.username})

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