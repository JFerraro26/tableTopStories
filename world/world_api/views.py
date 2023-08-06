from .models import World, City, Country, District
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from knox.auth import TokenAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import (
    WorldDetailSerializer,
    WorldListSerializer,
    CountryDetailSerializer,
    CountryListSerializer,
    CityDetailSerializer,
    CityListSerializer,
    DistrictDetailSerializer,
    DistrictListSerializer,
)


# Create your views here.
class WorldList(generics.ListCreateAPIView):
    queryset = World.objects.all()
    serializer_class = WorldListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class WorldUpdate(generics.UpdateAPIView):
    queryset = World.objects.all()
    serializer_class = WorldListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class WorldDetail(generics.RetrieveDestroyAPIView):
    queryset = World.objects.all()
    serializer_class = WorldDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class CountryList(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class CountryUpdate(generics.UpdateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class CountryDetail(generics.RetrieveDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CityListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class CityUpdate(generics.UpdateAPIView):
    queryset = City.objects.all()
    serializer_class = CityListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class CityDetail(generics.RetrieveDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CityDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class DistrictList(generics.ListCreateAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class DistrictUpdate(generics.UpdateAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]
    http_method_names = ["put", "patch"]


class DistrictDetail(generics.RetrieveDestroyAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]
