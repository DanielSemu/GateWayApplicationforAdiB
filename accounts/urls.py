
from django.urls import path

from .views import RegisterUserView, LoginUserView,TestAuthenticationView,LogoutUserView

urlpatterns = [
    path('register/',RegisterUserView.as_view(),name="register"),
    path('login/',LoginUserView.as_view(),name="login"),
    path('profile/',TestAuthenticationView.as_view(),name="granted"),
    path('profile/',TestAuthenticationView.as_view(),name="granted"),
    path('logout/',LogoutUserView.as_view(),name="logout"),


]
