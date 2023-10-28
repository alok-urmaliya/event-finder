import { Location, FormData, EventPayload } from "../utils";
import axios from "axios";

const EventHelper = {
    getUserLocation: async function(){
        const response:any = await axios.get('https://ipinfo.io/loc?token=4d0f9a8c2db5db')
        .then(res => res.data)
        .then(loc => loc.split(','))
        return new Location(response[0].trim(), response[1].trim())
    },
    getUserLocationByText: function(locationText:string){
        let location:Location = new Location('','');
        return location
    },
    getEventRequestPayload: async function(data:FormData){
        const loc:Location = data.autoDetectLocation ? await this.getUserLocation() : this.getUserLocationByText(data.location)        
        const payload:EventPayload = new EventPayload(data.keyword, data.category, data.distance, loc.latitude, loc.longitude);
        return payload;
    }
}

export default EventHelper;