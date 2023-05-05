from django.contrib import admin
from .models import World, Country, City, Campaign, NpcVO

# Register your models here.
@admin.register(World)
class WorldAdmin(admin.ModelAdmin):
    pass

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    pass

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    pass

@admin.register(Campaign)
class CampaignAdmin(admin.ModelAdmin):
    pass

@admin.register(NpcVO)
class NpcVOAdmin(admin.ModelAdmin):
    pass
