from .models import World, City, Country, Campaign, NpcVO
from rest_framework import serializers
from rest_framework import generics




# Create your views here.
class CampaignSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaign
        fields = [
            "id",
            "name",
            "system",
            "picture",
            "description",
        ]

class WorldSerializer(serializers.ModelSerializer):
    class Meta:
        model = World
        fields = [
            "id",
            "name",
            "picture",
            "description",
        ]

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = [
            "id",
            "name",
            "picture",
            "description",
            "world",
        ]

class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = [
            "id",
            "name",
            "picture",
            "description",
            "country",
        ]

class NpcVOSerializer(serializers.ModelSerializer):
    class Meta:
        model = NpcVO
        fields = [
            "id",
            "name",
            "picture",
            "chr_class",
            "description",
            "current_city",
            "visited_cities",
        ]


class CampaignList(generics.ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class CampaignDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

class WorldList(generics.ListCreateAPIView):
    queryset = World.objects.all()
    serializer_class = WorldSerializer

class WorldDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = World.objects.all()
    serializer_class = WorldSerializer

class CountryList(generics.ListCreateAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class CountryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class CityList(generics.ListCreateAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class CityDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = City.objects.all()
    serializer_class = CitySerializer

class NpcVOList(generics.ListCreateAPIView):
    queryset = NpcVO.objects.all()
    serializer_class = NpcVOSerializer
