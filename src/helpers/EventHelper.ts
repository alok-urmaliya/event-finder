import { Location, FormData, EventPayload } from "../utils";
import axios from "axios";

const EventHelper = {
    getUserLocation: function(){
        return axios.get('https://ipinfo.io/loc?token=4d0f9a8c2db5db')
        .then(res => res.data)
        .then(loc => loc.split(','))
        .then(response => new Location(response[0].trim(), response[1].trim()))
    },
    getUserLocationByText: function(locationText:string){
        let location:Location = new Location('','');
        return location
    },
    getEventRequestPayload: function(data:FormData){
        return this.getUserLocation()
        .then(loc => new EventPayload(data.keyword, data.category, data.distance, loc.latitude, loc.longitude))
    }
}

export default EventHelper;