import React from 'react'
import '../styles/EventsGrid.css'

const GridElement = (props: any) => {
    return (
        <div className="events-grid--item">
            <p className='events-grid--item-field'>{props.data.date}</p>
            <img className='events-grid--item-field' src={props.data.icon} alt="Image is unavailable!" />
            <p className='events-grid--item-field'>{props.data.event}</p>
            <p className='events-grid--item-field'>{props.data.genre}</p>
            <p className='events-grid--item-field'>{props.data.venue}</p>
        </div>
    )
}

export default GridElement;