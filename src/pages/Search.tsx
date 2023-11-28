import React, { useEffect } from 'react'
import '../styles/Search.css'
import SearchForm from '../components/SearchForm'
import EventsGrid from '../components/EventsGrid'
import { EventData, EventPayload } from '../utils'
import axios from 'axios'

const Search = () => {
    const [gridVisible, setGridVisible] = React.useState<boolean>(false)
    const [gridData, setGridData] = React.useState<EventData[]>([])

    function getEvents(requestPayload: EventPayload) {
        requestPayload != null && axios.get('http://127.0.0.1:8000/events', {
            params: {
                "keyword": requestPayload.keyword,
                "distance": requestPayload.distance,
                "category": requestPayload.category,
                "latitude": requestPayload.latitude,
                "longitude": requestPayload.longitude
            }
        }).then(res => res.data)
            .then(res => populateGridData(res))
    }

    function populateGridData(parsedJson: any) {
        let eventsList: EventData[] = []
        parsedJson.forEach((item: any) => {
            if (item._embedded?.venues[0].name &&
                item._embedded?.venues[0]?.address?.line1 &&
                item._embedded?.venues[0]?.boxOfficeInfo?.phoneNumberDetail &&
                item._embedded?.venues[0]?.boxOfficeInfo?.openHoursDetail &&
                item._embedded?.venues[0]?.generalInfo?.generalRule &&
                item._embedded?.venues[0]?.generalInfo?.childRule) {
                var event = new EventData(
                    item.id,
                    item.dates.start.localDate + ' ' + item.dates.start.localTime ?? null,
                    item.images[0].url ?? null,
                    item.name ?? null,
                    item.classifications?.length > 0 ? item.classifications[0].segment.name : null,
                    item._embedded?.venues[0].name ?? null
                )
                eventsList.push(event)
            }
        })
        setGridData(eventsList)
        gridData.length > 0 && setGridVisible(true)
    }

    return (
        <div className='search-page'>
            <SearchForm setGridVisible={setGridVisible} submitForm={getEvents} />
            {gridVisible && <EventsGrid gridData={gridData} setGridData={setGridData} />}
        </div>
    )
}

export default Search;