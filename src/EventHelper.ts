import { Location } from "./utils";

const EventHelper = {
    getUserLocation: function(){
        let location:Location = new Location('','');
        return location
    },
    getUserLocationByText: function(locationText:string){
        let location:Location = new Location('','');
        return location
    },
    getEventRequestPayload: function(data:any){
        const loc:Location = data.autoDetectLocation ? this.getUserLocation() : this.getUserLocationByText(data.location)        
        const payload = {
            keyword: data.keyword,
            distance: data.distance,
            category: data.category,

        }

        return payload;
    }
}

export default EventHelper;