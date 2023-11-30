from django.contrib import admin
from django.urls import path
from EventFinderAPI.views import (EventListAPIView)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('events/', EventListAPIView.GetEvents),
    path('eventdetail/', EventListAPIView.GetEventDetail),
    path('suggest/', EventListAPIView.GetSuggestion)
]
