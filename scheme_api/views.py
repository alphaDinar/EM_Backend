from django.shortcuts import render
from django.middleware.csrf import get_token
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.authentication import CSRFCheck
from rest_framework.views import APIView,Response
from course_api.serializers import CourseSerializer
from .serializers import SchemeSerializer, ImageBoxSerialiazer
from .models import Course
from auth_api.models import Teacher
from .models import Scheme, ImageBox
from django.http import FileResponse

class SchemeAPI(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = CourseSerializer

    def get(self,request, slug):
        token = get_token(request)
        scheme_obj = Course.objects.get(slug=slug)
        scheme = Scheme.objects.filter(course=scheme_obj)
        pend_count = scheme.filter(status='pending').count()
        act_count = scheme.filter(status='active').count()
        comp_count = scheme.filter(status='completed').count()
        resource_count = pend_count + act_count + comp_count
        return Response({'resources':scheme.values(), 'status':[pend_count,act_count,comp_count], 'resource_count':resource_count, 'token' : token})
    
    def post(self,request, slug):
        status = request.data.get('status')
        scheme_obj = Course.objects.get(slug=slug)
        if status == 'all':
            scheme = Scheme.objects.filter(course=scheme_obj)
        else:
            scheme = Scheme.objects.filter(course=scheme_obj).filter(status=status)
        return Response({'resources':scheme.values()})
    def get_queryset(self):
        queryset = Course.objects.all()
        return queryset


class UseSchemeAPI(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    serializer_class = SchemeSerializer
    queryset = Scheme.objects.all()

    def get(self,request,slug):
        scheme = Scheme.objects.get(slug=slug).topic
        # scheme_info = 
        scheme_images = Scheme.objects.get(slug=slug).get_images()
        scheme_passages = Scheme.objects.get(slug=slug).get_passage()
        scheme_videos = Scheme.objects.get(slug=slug).get_videos()
        imageList = []
        for image in scheme_images:    
            image_con = {   
                'id' : image.id,
                'name' : image.name,
                'image' : request.build_absolute_uri(image.image.url),
                'content' : image.content,   
            }
            imageList.append(image_con)
        passageList = []
        for passage in scheme_passages:
            passage_con = {
                'id' : passage.id,
                'name' : passage.name,
                'content' : passage.content,
            }
            passageList.append(passage_con)
        videoList = []
        for video in scheme_videos:
            video_con = {   
                'id' : video.id,
                'name' : video.name,
                'video' : request.build_absolute_uri(video.video.url),
                'content' : video.content,   
            }
            videoList.append(video_con)
        return Response({'scheme':scheme,'imageList':imageList, 'passageList':passageList, 'videoList':videoList}) 


class PostView(generics.ListAPIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer

    def post(self,request, format=None):
        return Response({'test':'good'})
    

class GetImageAPI(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = ImageBoxSerialiazer
    queryset = ImageBox.objects.all()
    # def get(self,request):
    #     image = ImageBox.objects.get(id=1).image.url
    #     return Response({'image': image})