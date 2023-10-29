import React from 'react'
import '../styles/EventsGrid.css'

const GridElement = (props: any) => {
    const [data, setData] = React.useState<any>(props.data)

    return (
        <div className="events-grid--item">
            <p className='events-grid--item-field'>{data.date}</p>
            <img className='events-grid--item-image' src={data.icon} alt="Image is unavailable!" />
            <p className='events-grid--item-field'>{data.event}</p>
            <p className='events-grid--item-field'>{data.genre}</p>
            <p className='events-grid--item-field'>{data.venue}</p>
        </div>
    )
}

export default GridElement;