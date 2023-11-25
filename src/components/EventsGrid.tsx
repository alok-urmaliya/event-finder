import React, { Dispatch } from 'react'
import '../styles/EventsGrid.css'
import GridElement from './GridElement'
import { EventData } from '../utils'
import EventDetails from './EventDetails'

interface EventsGridProps {
    gridData: EventData[];
    setGridData: React.Dispatch<React.SetStateAction<EventData[]>>;
}

const EventsGrid: React.FC<EventsGridProps> = ({ gridData, setGridData }) => {
    const [gridElements, setGridElements] = React.useState<any[]>([])
    const [isDetail, setIsDetail] = React.useState<boolean>(false)
    const [selectedEvent, setSelectedEvent] = React.useState('')

    const [order, setOrder] = React.useState('ASC')

    function sortData(fieldName: string) {
        if (order === 'ASC') {
            const sorted = [...gridData].sort((a: EventData, b: EventData) => {
                return (a as any)[fieldName].toLowerCase() > (b as any)[fieldName].toLowerCase() ? 1 : -1
            })
            setGridData(sorted)
            setOrder('DESC')
        }
        if (order === 'DESC') {
            const sorted = [...gridData].sort((a: EventData, b: EventData) => {
                return (a as any)[fieldName].toLowerCase() < (b as any)[fieldName].toLowerCase() ? 1 : -1
            })
            setGridData(sorted)
            setOrder('ASC')
        }
    }

    React.useEffect(() => {
        if (gridData.length > 0) {
            const events = gridData.map((item: EventData) => <GridElement data={item} key={item?.id} handleDetailClick={handleDetailClick} />)
            setGridElements(events)
        }
        else {
            const message = [<div className='no-records-found'>No Records Found</div>]
        }
    }, [gridData])

    function handleBackClick() {
        setIsDetail(prev => !prev)
    }

    function handleDetailClick(eventkey: string) {
        setSelectedEvent(eventkey)
        setIsDetail(prev => !prev)
    }



    return (
        isDetail ?
            <EventDetails handleBackClick={handleBackClick} event={selectedEvent} />
            : (
                < div className="events-grid--container">
                    <div className="events-grid--headers">
                        <h5 className="events-grid--heading">Date/Time</h5>
                        <h5 className="events-grid--heading">Icon</h5>
                        <h5 className="events-grid--heading" onClick={() => sortData("event")}>Event</h5>
                        <h5 className="events-grid--heading" onClick={() => sortData("genre")}>Genre</h5>
                        <h5 className="events-grid--heading" onClick={() => sortData("venue")}>Venue</h5>
                    </div>
                    {gridElements}
                </div >
            )
    )
}

export default EventsGrid;