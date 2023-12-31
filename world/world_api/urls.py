from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import (
    WorldList,
    WorldDetail,
    WorldUpdate,
    CountryList,
    CountryDetail,
    CountryUpdate,
    CityList,
    CityDetail,
    CityUpdate,
    DistrictList,
    DistrictDetail,
    DistrictUpdate,
)


urlpatterns = [
    path("worlds", WorldList.as_view()),
    path("worlds/<int:pk>", WorldDetail.as_view()),
    path("worlds/update/<int:pk>", WorldUpdate.as_view()),
    path("countries", CountryList.as_view()),
    path("countries/<int:pk>", CountryDetail.as_view()),
    path("countries/update/<int:pk>", CountryUpdate.as_view()),
    path("cities", CityList.as_view()),
    path("cities/<int:pk>", CityDetail.as_view()),
    path("cities/update/<int:pk>", CityUpdate.as_view()),
    path("districts", DistrictList.as_view()),
    path("districts/<int:pk>", DistrictDetail.as_view()),
    path("districts/update/<int:pk>", DistrictUpdate.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
