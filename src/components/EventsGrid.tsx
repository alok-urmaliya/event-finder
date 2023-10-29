import React from 'react'
import '../styles/EventsGrid.css'
import GridElement from './GridElement'
import icon from './logo192.png'
import { EventData } from '../utils'
import EventDetails from './EventDetails'

const EventsGrid = (props: any) => {
    const [eventsList, setEventsList] = React.useState<EventData[]>(props.gridData)
    const [gridElements, setGridElements] = React.useState<any[]>([])
    const [isDetail, setIsDetail] = React.useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = React.useState('')

    React.useEffect(() => {
        setEventsList(props.gridData)
    }, [props.gridData])

    React.useEffect(() => {
        if (eventsList.length > 0) {
            console.log(eventsList)
            const events = eventsList.map((item: any) => <GridElement data={item} key={item?.id} handleDetailClick={handleDetailClick} />)
            setGridElements(events)
        }
        else {
            const message = [<div className='no-records-found'>No Records Found</div>]
        }
    }, [eventsList])

    function handleBackClick() {
        setIsDetail(prev => !prev)
    }

    function handleDetailClick(eventkey: string) {
        console.log(`this element was clicked:  ${eventkey}`)
        setSelectedEvent(eventkey)
        setIsDetail(prev => !prev)
    }



    return (
        isDetail ? <EventDetails handleBackClick={handleBackClick} event={selectedEvent} /> : (
            < div className="events-grid--container">
                <div className="events-grid--headers">
                    <h5 className="events-grid--heading">Date/Time</h5>
                    <h5 className="events-grid--heading">Icon</h5>
                    <h5 className="events-grid--heading">Event</h5>
                    <h5 className="events-grid--heading">Genre</h5>
                    <h5 className="events-grid--heading">Venue</h5>
                </div>
                {gridElements}
            </div >)
    )
}

export default EventsGrid;