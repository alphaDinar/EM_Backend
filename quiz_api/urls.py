from django.urls import path
from . import views

urlpatterns = [
    path('quiz_api/<str:slug>/', views.QuizAPI.as_view()),
    path('get_quiz_api/<int:id>/', views.GetQuizAPI.as_view()),
    
    path('create_quiz_api/<str:slug>/', views.CreateQuizAPI.as_view()),
    path('set_quiz_api/<str:slug>/', views.SetQuizAPI.as_view()),
    path('start_quiz_api/<str:slug>/', views.StartQuizAPI.as_view()),
    path('assess_quiz/<int:id>/', views.AssesQuizAPI.as_view()),
]