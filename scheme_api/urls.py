from django.urls import path
from . import views

urlpatterns = [
    path('scheme_api/<str:slug>/', views.SchemeAPI.as_view()),
    path('use_scheme_api/<str:slug>/', views.UseSchemeAPI.as_view()),


    path('post', views.PostView.as_view()),


    path('get_images', views.GetImageAPI.as_view()),
]
