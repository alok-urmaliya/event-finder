import React, { ChangeEvent, useEffect } from 'react'
import '../styles/Search.css'
import SearchForm from '../components/SearchForm'
import EventsGrid from '../components/EventsGrid'
import { EventData, EventPayload } from '../utils'
import axios from 'axios'
import { parse } from 'path'

const Search = () => {
    const [requestPayload, setRequestPayload] = React.useState(new EventPayload('', '', '', '', ''))
    const [gridData, setGridData] = React.useState<EventData[]>([])
    const [gridVisible, setGridVisible] = React.useState(false)
    const [parsedJson, setParsedJson] = React.useState<any[]>([])


    console.log('Grid Data')
    console.log(gridData)

    useEffect(() => {
        (async () => {
            const response = requestPayload.latitude != '' ? await axios.get('http://127.0.0.1:8000/events', {
                params: {
                    "keyword": requestPayload.keyword,
                    "distance": requestPayload.distance,
                    "category": requestPayload.category,
                    "latitude": requestPayload.latitude,
                    "longitude": requestPayload.longitude
                }
            }).then(res => res.data)
                .then((res: any) => setParsedJson(res)) : null
            console.log('this is json response')
            console.log(response)

            if (parsedJson.length > 0) {
                console.log(parsedJson)
                console.log(parsedJson[0].id)
                console.log(parsedJson[0].dates.start.localDate + ' ' + parsedJson[0].dates.start.localTime)
                console.log(parsedJson[0].images[0].url)
                console.log(parsedJson[0].name)
                console.log(parsedJson[0].classifications.length > 0 ? parsedJson[0].classifications[0].segment.name : '')
                console.log(parsedJson[0]._embedded.venues[0].name)
            }
            let list: EventData[] = [];
            list = parsedJson.map((item: any) => {
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
            setGridData(list ?? null)
            console.log('we initialized gridData:')
            console.log(gridData)
        })()
    }, [requestPayload])

    return (
        <div className='search-page'>
            <SearchForm setPayload={setRequestPayload} />
            {/* {gridVisible ? <EventsGrid /> : <></>} */}
            <EventsGrid gridData={gridData} />
        </div>
    )
}

export default Search;