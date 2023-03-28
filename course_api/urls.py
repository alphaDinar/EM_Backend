from django.urls import path
from . import views

urlpatterns = [
    path('api/course_api/', views.CourseAPI.as_view()),
    path('api/get_course_api/<str:slug>/', views.GetCourseAPI.as_view()),
]
