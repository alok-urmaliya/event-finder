import React, { useEffect } from 'react'
import '../styles/Search.css'
import SearchForm from '../components/SearchForm'
import EventsGrid from '../components/EventsGrid'
import { EventData, EventPayload } from '../utils'
import axios from 'axios'

const Search = () => {
    const [requestPayload, setRequestPayload] = React.useState<EventPayload | null>(null)
    const [gridData, setGridData] = React.useState<(EventData | null)[]>([])
    const [gridVisible, setGridVisible] = React.useState<boolean>(false)

    useEffect(() => {
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
    }, [requestPayload])

    function populateGridData(parsedJson: any) {
        let list: (EventData | null)[] = [];
        list = parsedJson.map((item: any) => {
            if (item._embedded?.venues[0].name == null ||
                item._embedded?.venues[0]?.address?.line1 == null ||
                item._embedded?.venues[0]?.boxOfficeInfo?.phoneNumberDetail == null ||
                item._embedded?.venues[0]?.boxOfficeInfo?.openHoursDetail == null ||
                item._embedded?.venues[0]?.generalInfo?.generalRule == null ||
                item._embedded?.venues[0]?.generalInfo?.childRule == null) {
                return null;
            }
            return (
                new EventData(
                    item.id,
                    item.dates.start.localDate + ' ' + item.dates.start.localTime ?? null,
                    item.images[0].url ?? null,
                    item.name ?? null,
                    item.classifications?.length > 0 ? item.classifications[0].segment.name : null,
                    item._embedded?.venues[0].name ?? null
                )
            )
        })
        const filteredList = list.filter(item => { if (item != null) return item; })
        setGridData(filteredList)
        gridData?.length > 0 ? setGridVisible(true) : setGridVisible(false)
    }

    return (
        <div className='search-page'>
            <SearchForm setPayload={setRequestPayload} setGridVisible={setGridVisible} />
            {gridVisible && <EventsGrid gridData={gridData} />}
        </div>
    )
}

export default Search;