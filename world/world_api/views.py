from .models import World, City, Country, NpcVO
from rest_framework import serializers
from rest_framework import generics




# Create your views here.
class NpcVOListSerializer(serializers.ModelSerializer):
    class Meta:
        model = NpcVO
        fields = [
            "pk",
            "name",
        ]

class CityListSerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            "pk",
            "name",
            "country",
        ]

class CityDetailSerializer(serializers.ModelSerializer):
    npcs = NpcVOListSerializer(many=True, read_only=True)
    class Meta:
        model = City
        fields = [
            "pk",
            "name",
            "picture",
            "description",
            "country",
            "npcs",
        ]

class CountryListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = [
            "pk",
            "name",
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
    class Meta:
        model = World
        fields = [
            "pk",
            "name",
        ]

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

class WorldDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = World.objects.all()
    serializer_class = WorldDetailSerializer

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

class NpcVOList(generics.ListCreateAPIView):
    queryset = NpcVO.objects.all()
    serializer_class = NpcVOListSerializer
