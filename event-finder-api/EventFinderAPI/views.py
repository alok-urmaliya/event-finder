from rest_framework.views import APIView
from django.http import JsonResponse
from rest_framework import permissions
import requests
from .helper import ApiHelper
import json
from .app_settings import API_URLS, TICKETMASTER_SECRET_KEY

class EventListAPIView(APIView):
    permission_classes = (permissions.AllowAny)
 
    # API Method to get a list of events 
    def GetEvents(request):
        payload = ApiHelper.GetEventApiData(request)
        api_url = API_URLS['EVENTS_API']
        try:
            events_list = requests.get(api_url, params=payload)
            events_list_json = json.loads(events_list.content)
            _embedded = events_list_json["_embedded"]
            events = _embedded["events"]
        except:
            return JsonResponse('Error Occured while fetching events! please try again after some time.', safe=False)
        return JsonResponse(events, safe=False)
    
    # API method to get detailed info about a specific event
    def GetEventDetail(request):
        api_url = API_URLS['EVENT_DETAIL_API']
        eventid = request.GET.get("id")
        payload = {
            "apikey": TICKETMASTER_SECRET_KEY,
            "id":eventid 
        }
        try:
            event_data = requests.get(api_url, params=payload)
            event_data_json = json.loads(event_data.content)
            _embedded = event_data_json["_embedded"]
            event = _embedded["events"][0]
        except:
            return JsonResponse('Error Occured while fetching event details! please try again after some time.', safe=False)
        return JsonResponse(event, safe = False)
    
    def GetSuggestion(request):
        api_url = API_URLS['SUGGEST_API']
        payload = {
            "apikey": TICKETMASTER_SECRET_KEY,
            "keyword": request.GET.get("keyword")
        }
        try:
            response = requests.get(api_url, params=payload)
            responseJson = json.loads(response.content)
            _embedded = responseJson["_embedded"]
            venues = _embedded["venues"]
            suggestion = []
            for venue in venues:
                if "name" in venue:
                    suggestion.append(venue["name"])
            return JsonResponse(suggestion, safe = False)
        except:
            return JsonResponse("Error Occured!", safe=False)