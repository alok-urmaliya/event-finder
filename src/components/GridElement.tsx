import React from 'react'
import '../styles/EventsGrid.css'
import { EventData } from '../utils'

interface GridElementProps {
    data: EventData;
    handleDetailClick: (eventkey: string) => void;
}
const GridElement: React.FC<GridElementProps> = ({ data, handleDetailClick }) => {
    function handleClick() {
        handleDetailClick(data.id)
    }
    return (
        <div className="events-grid--item" onClick={handleClick}>
            <p className='events-grid--item-field'>{data.date}</p>
            <img className='events-grid--item-image' src={data.icon} alt="Image is unavailable!" />
            <p className='events-grid--item-field'>{data.event}</p>
            <p className='events-grid--item-field'>{data.genre}</p>
            <p className='events-grid--item-field'>{data.venue}</p>
        </div>
    )
}

export default GridElement;