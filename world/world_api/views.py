from .models import World, City, Country, District
from rest_framework import serializers, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from knox.auth import TokenAuthentication


# Create your views here.
class DistrictListSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "city",
        ]


class DistrictDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = District
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "city",
        ]


class CityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "country",
        ]


class CityDetailSerializer(serializers.ModelSerializer):
    districts = DistrictDetailSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = ["pk", "name", "picture", "description", "country", "districts"]


class CountryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "world",
        ]


class CountryDetailSerializer(serializers.ModelSerializer):
    cities = CityDetailSerializer(many=True, read_only=True)

    class Meta:
        model = Country
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "world",
            "cities",
        ]


class WorldListSerializer(serializers.ModelSerializer):
    countries = CountryDetailSerializer(many=True, read_only=True)

    class Meta:
        model = World
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "countries",
        ]
        depth = 1


class WorldDetailSerializer(serializers.ModelSerializer):
    countries = CountryDetailSerializer(many=True, read_only=True)

    class Meta:
        model = World
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "countries",
        ]
        depth = 1


class WorldList(generics.ListCreateAPIView):
    queryset = World.objects.all()
    serializer_class = WorldListSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class WorldDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = World.objects.all()
    serializer_class = WorldDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticatedOrReadOnly]


class CountryList(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryListSerializer


class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountryDetailSerializer


class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CityListSerializer


class CityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CityDetailSerializer


class DistrictList(generics.ListCreateAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictListSerializer


class DistrictDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = District.objects.all()
    serializer_class = DistrictDetailSerializer
