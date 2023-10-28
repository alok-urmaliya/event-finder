import React, { ChangeEvent, useEffect } from 'react'
import '../styles/Search.css'
import SearchForm from '../components/SearchForm'
import EventsGrid from '../components/EventsGrid'
import { EventData, EventPayload } from '../utils'
import axios from 'axios'

const Search = () => {
    const [requestPayload, setRequestPayload] = React.useState(new EventPayload('', '', '', '', ''))
    const [gridData, setGridData] = React.useState(new EventData('', '', '', '', ''))
    const [gridVisible, setGridVisible] = React.useState(false)

    useEffect(() => {
        const response = fetch('http://127.0.0.1:8000/events')
        console.log(response)
    }, [])

    return (
        <div className='search-page'>
            <SearchForm setPayload={setRequestPayload} />
            {gridVisible ? <EventsGrid /> : <></>}
        </div>
    )
}

export default Search;