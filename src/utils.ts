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

export {
    FormData,
    Location
}