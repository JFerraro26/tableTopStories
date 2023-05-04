from django.contrib import admin
from .models import World, Country, City

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
