import React from 'react'
import '../styles/EventsGrid.css'
import GridElement from './GridElement'
import icon from './logo192.png'
import { EventData } from '../utils'

const EventsGrid = (props: any) => {
    const [eventsList, setEventsList] = React.useState<EventData[]>(props.gridData)

    React.useEffect(() => {
        setEventsList(props.gridData)
        console.log('eventsList is here from down the component')
        console.log(eventsList)
    }, props.gridData)

    function handleClick() {

    }

    const gridElements = eventsList.map((item: any) => <GridElement data={item} onClick={handleClick} />)

    return (
        <div className="events-grid--container" >
            <div className="events-grid--headers">
                <h5 className="events-grid--heading">Date/Time</h5>
                <h5 className="events-grid--heading">Icon</h5>
                <h5 className="events-grid--heading">Event</h5>
                <h5 className="events-grid--heading">Genre</h5>
                <h5 className="events-grid--heading">Venue</h5>
            </div>
            {gridElements}
        </div >
    )
}

export default EventsGrid;