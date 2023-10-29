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

export {
    FormData,
    Location,
    EventPayload,
    Category,
    EventData
}