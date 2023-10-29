import React from 'react'
import '../styles/EventsGrid.css'
import GridElement from './GridElement'
import icon from './logo192.png'
import { EventData } from '../utils'

const EventsGrid = (props: any) => {
    const [eventsList, setEventsList] = React.useState<EventData[]>(props.gridData)
    const [gridElements, setGridElements] = React.useState<any[]>([])

    React.useEffect(() => {
        setEventsList(props.gridData)
        const events = eventsList.map((item: any) => <GridElement data={item} key={item.id} onClick={handleClick} />)
        setGridElements(events)
        console.log(gridElements)
    }, [props.gridData])

    function handleClick() {

    }
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