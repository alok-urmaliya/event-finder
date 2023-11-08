from .app_settings import TICKETMASTER_SECRET_KEY
from geolib import geohash

class ApiHelper:
    def GetEventApiData(request_data):
        latitude = request_data.GET.get("latitude")
        longitude = request_data.GET.get("longitude")
        geohash_value = geohash.encode(latitude, longitude, 7)

        payload = {
            "apikey" : TICKETMASTER_SECRET_KEY,
            "keyword" : request_data.GET.get("keyword"),
            "category" : request_data.GET.get("category"),
            "radius" : request_data.GET.get("distance"),
            "unit" : 'miles',
            "geohash" : geohash_value
        }
        return payload