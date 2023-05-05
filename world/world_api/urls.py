from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    WorldList,
    WorldDetail,
    CountryList,
    CountryDetail,
    CityList,
    CityDetail,
    NpcVOList,
)


urlpatterns = [
    path("worlds", WorldList.as_view()),
    path("worlds/<int:pk>", WorldDetail.as_view()),
    path("countries", CountryList.as_view()),
    path("countries/<int:pk>", CountryDetail.as_view()),
    path("cities", CityList.as_view()),
    path("cities/<int:pk>", CityDetail.as_view()),
    path("npcs", NpcVOList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
