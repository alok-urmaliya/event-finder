enum Category {
    Music = "KZFzniwnSyZfZ7v7nJ",
    Sports = "KZFzniwnSyZfZ7v7nE",
    ArtsTheatre = "KZFzniwnSyZfZ7v7na",
    Film = "KZFzniwnSyZfZ7v7nn",
    Miscellaneous = "KZFzniwnSyZfZ7v7n1",
    Default = ""
}

class FormData {
    keyword: string
    distance: string
    category: string
    location: string
    autoDetectLocation: boolean

    constructor(keyword: string, distance: string, category: string, location: string, autoDetectLocation: boolean) {
        this.keyword = keyword
        this.distance = distance
        this.category = category
        this.location = location
        this.autoDetectLocation = autoDetectLocation
    }
}

class Location {
    latitude: string
    longitude: string

    constructor(latitude:string, longitude:string)
    {
        this.latitude = latitude
        this.longitude = longitude
    }
}

class EventPayload {
    keyword: string
    category: string
    distance: string
    latitude: string
    longitude: string
    
    constructor(keyword:string ,category:string ,distance:string ,latitude:string ,longitude:string)
    {
        this.keyword = keyword
        this.category = category
        this.distance = distance
        this.latitude = latitude
        this.longitude = longitude
    }
}

class EventData {
    id : string
    date : string
    icon : string
    event : string
    genre : string
    venue : string

    constructor(id : string,date : string, icon : string, event : string, genre : string, venue : string)
    {
        this.id = id
        this.date = date
        this.icon = icon
        this.event = event
        this.genre = genre
        this.venue = venue
    }
}

class Venue {
    name : string | null
    address : string | null
    phonenumber : string | null
    openhours : string | null
    generalrule : string | null
    childrule : string | null

    constructor(name:string|null, address : string|null, phonenumber : string|null, openhours : string|null, generalrule : string|null, childrule : string|null)
    {
        this.name = name
        this.address = address
        this.phonenumber = phonenumber
        this.openhours = openhours
        this.generalrule = generalrule
        this.childrule = childrule
    }
}

class Artist {
    name : string|null
    url : string | null

    constructor(name:string|null,url:string|null)
    {
        this.name = name
        this.url = url
    }
}

class EventDetail {
    id:string
    name:string
    url:string
    date:string
    artists:Artist[] | null
    venue:string
    genre:string
    priceranges:string | null
    ticketstatus:string | null
    buyticketlink:string | null
    seatmapimgurl:string | null
    venueData:Venue | null

    constructor(id:string, name:string,url:string,date:string, artists:Artist[]|null, venue:string, genre:string, priceranges:string|null, ticketstatus:string|null, buyticketlink:string|null, seatmapimgurl:string|null, eventname:string|null,address:string|null ,phonenumber:string|null ,openhours:string|null ,generalrule:string|null ,childrule:string|null){
        this.id = id
        this.name = name
        this.url = url
        this.date = date
        this.artists = artists
        this.venue = venue
        this.genre = genre
        this.priceranges = priceranges
        this.ticketstatus = ticketstatus
        this.buyticketlink = buyticketlink
        this.seatmapimgurl = seatmapimgurl
        this.venueData = new Venue(
            eventname,
            address,
            phonenumber,
            openhours,
            generalrule,
            childrule
        )
    }
}

class FavoriteEvent{
    index : number
    id : string
    date : string
    event : string
    genre : string
    venue : string

    constructor(index : number,id : string,date : string, event : string, genre : string, venue : string)
    {
        this.index = index
        this.id = id
        this.date = date
        this.event = event
        this.genre = genre
        this.venue = venue
    }
}

export {
    FormData,
    Location,
    EventPayload,
    Category,
    EventData,
    Venue,
    Artist,
    EventDetail,
    FavoriteEvent
}