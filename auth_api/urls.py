from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', views.base),
    path('course', views.base),
    path('dashboard/<str:slug>', views.base_slug),
    path('dashboard/<str:slug>/quiz', views.base_slug),
    path('dashboard/<str:slug>/quiz/get_quiz/<int:id>', views.base_slug_2),
    path('dashboard/quiz/view', views.base_slug),

    path('start_quiz/<str:slug>', views.base_slug),
    path('create_quiz/<str:slug>', views.base_slug),
    path('set_quiz/<str:slug>', views.base_slug),

    path('use_scheme/<str:slug>',views.base_slug),
    path('new_page', views.base),

    path('auth_api/', views.UserAPI.as_view()),
    path('logout_api/', views.LogoutAPI.as_view()),

    path('auth_api/get_token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth_api/refresh_token/', TokenRefreshView.as_view(), name='token_refresh'),

    path('test', views.base),
]