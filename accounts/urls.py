
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterUserView, LoginUserView,TestAuthenticationView,LogoutUserView,getApplications,ApplicationCreateView

urlpatterns = [
    path('applications/',getApplications , name="applications"),
    path('register/',RegisterUserView.as_view(),name="register"),
    path('login/',LoginUserView.as_view(),name="login"),
    path('profile/',TestAuthenticationView.as_view(),name="granted"),
    path('token/refresh/',TokenRefreshView.as_view(),name="refresh_token"),
    path('profile/',TestAuthenticationView.as_view(),name="granted"),
    path('register/application',ApplicationCreateView.as_view(),name="add_app"),
    path('logout/',LogoutUserView.as_view(),name="logout"),


]
