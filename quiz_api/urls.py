from django.urls import path
from . import views

urlpatterns = [
    path('api/quiz_api/<str:slug>/', views.QuizAPI.as_view()),
    path('api/get_quiz_api/<int:id>/', views.GetQuizAPI.as_view()),
    
    path('api/create_quiz_api/<str:slug>/', views.CreateQuizAPI.as_view()),
    path('api/set_quiz_api/<str:slug>/', views.SetQuizAPI.as_view()),
    path('api/start_quiz_api/<str:slug>/', views.StartQuizAPI.as_view()),
    path('api/assess_quiz/<int:id>/', views.AssesQuizAPI.as_view()),
]