from django.shortcuts import render
from django.core import serializers
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from django.middleware.csrf import get_token
from auth_api.models import User
from rest_framework.views import APIView,Response
from .serializers import CourseSerializer
from auth_api.models import Teacher
from .models import Course
from scheme_api.models import Scheme
from auth_api.views import get_user
import jwt
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings

class CourseAPI(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CourseSerializer
    queryset = Course.objects.all()
    def post(self,request):
        token = request.data.get('token')
        user = get_user(token)
        print(user)
        courses = Teacher.objects.get(name=user).course.all()
        user = user.username
        return Response({'user':user ,'courses':courses.values()}) 

class GetCourseAPI(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CourseSerializer
    def get(self,request, slug):
        token = get_token(request)
        course = Course.objects.get(slug=slug).subject
        course_slug = Course.objects.get(slug=slug).slug
        return Response({'course': course, 'course_slug': course_slug, 'token': token})
    def get_queryset(self):
        queryset = Course.objects.all()
        return queryset