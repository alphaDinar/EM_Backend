from django.urls import path
from . import views

urlpatterns = [
    path('course_api', views.CourseAPI.as_view()),
    path('get_course_api/<str:slug>', views.GetCourseAPI.as_view()),
]
