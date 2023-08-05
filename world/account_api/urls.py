from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import CreatAccountAPI, UpdateAccountAPI, LoginAPI
from knox.views import LogoutView, LogoutAllView

urlpatterns = [
    path("create-account", CreatAccountAPI.as_view()),
    path("update-account/<uuid:id>", UpdateAccountAPI.as_view()),
    path("login", LoginAPI.as_view()),
    path("logout", LogoutView.as_view()),
    path("logout-all", LogoutAllView.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
