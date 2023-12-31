import React, { useEffect } from 'react'
import { Tabs, Tab } from '@mui/material'
import '../styles/EventDetails.css'
import axios from 'axios'
import { EventDetail, FavoriteEvent } from '../utils'
import { Artist } from '../utils'
import EventTab from './EventTab'
import VenueTab from './VenueTab'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const EventDetails = (props: any) => {
    const [activeTab, setActiveTab] = React.useState(0)
    const [selectedEvent] = React.useState(props.event);

    const [eventDetail, setEventDetail] = React.useState<EventDetail>();
    const [artistElements, setArtistElements] = React.useState<any[]>([])
    const [isFavorite, setIsFavorite] = React.useState(false)

    useEffect(() => {
        selectedEvent != '' && axios.get('http://127.0.0.1:8000/eventdetail', { params: { "id": selectedEvent } })
            .then(res => res.data)
            .then(res => populateEventDetails(res))
        setIsFavorite(checkIsFavorite(selectedEvent))
    }, [selectedEvent])

    function populateEventDetails(eventJson: any) {
        const artists: Artist[] = eventJson?._embedded.attractions?.map((att: any) => ({ name: att.name, url: att.url }))
        setArtistElements(artists.map(artist => {
            return (<a href={artist.url ?? ''} target='_blank' className="event-details-item-text event-details-item-artists">{artist.name}</a>)
        }))

        //const segmentSection = eventJson.classifications[0].segment.name + '|' + eventJson.classifications[0].genre.name + '|' + eventJson.classifications[0].subGenre.name + '|' + eventJson.classifications[0].type.name + '|' + eventJson.classifications[0].subType.name
        const tempEventDetail = new EventDetail(
            eventJson.id,
            eventJson.name,
            eventJson.url,
            eventJson.dates?.start?.localDate + ' ' + eventJson.dates?.start?.localTime,
            artists,
            eventJson._embedded?.venues ? eventJson._embedded?.venues[0]?.name : null,
            formatClassification(eventJson.classifications[0]),
            eventJson.priceRanges && (eventJson.priceRanges[0]?.min + '-' + eventJson?.priceRanges[0]?.max),
            eventJson.dates?.status?.code || null,
            eventJson?._embedded?.attractions[0]?.url || '',
            eventJson.seatmap?.staticUrl || null,
            eventJson._embedded?.venues[0].name || null,
            (eventJson._embedded?.venues && eventJson._embedded?.venues[0]?.address?.line1 + (eventJson._embedded?.venues[0]?.city?.name || '')) || null,
            eventJson._embedded?.venues[0]?.boxOfficeInfo?.phoneNumberDetail || null,
            eventJson._embedded?.venues[0]?.boxOfficeInfo?.openHoursDetail || null,
            eventJson._embedded?.venues[0]?.generalInfo?.generalRule || null,
            eventJson._embedded?.venues[0]?.generalInfo?.childRule || null
        );
        setEventDetail(tempEventDetail)
    }

    const getClassificationValue = (classification: any, propName: any) => {
        return classification[propName].name !== 'Undefined' ? classification[propName].name : null;
    };

    const formatClassification = (classification: any) => {
        const values = [
            getClassificationValue(classification, 'segment'),
            getClassificationValue(classification, 'genre'),
            getClassificationValue(classification, 'subGenre'),
            getClassificationValue(classification, 'type'),
            getClassificationValue(classification, 'subType'),
        ];
        const filteredValues = values.filter(value => value !== null);
        return filteredValues.join('|');
    };

    function checkIsFavorite(eventId: string) {
        const favoriteListString = localStorage.getItem('favoriteList') ?? ""
        const favoriteList: any[] = JSON.parse(favoriteListString)
        return favoriteList.some((element) => element.id === eventId);
    }

    function handleTabs(e: any, value: any) {
        setActiveTab(value)
    }

    function addToFavorites() {
        setIsFavorite(true);
        const favoriteListString = localStorage.getItem('favoriteList') ?? ""
        const favoriteList: any[] = JSON.parse(favoriteListString)

        if (eventDetail) {
            const newFavoriteElement = new FavoriteEvent(
                favoriteList.length + 1,
                eventDetail.id,
                eventDetail.date,
                eventDetail.name,
                eventDetail.genre,
                eventDetail.venue
            )
            favoriteList.push(newFavoriteElement)
            localStorage.setItem('favoriteList', JSON.stringify(favoriteList))
        }
    }

    return (
        eventDetail ?
            <div className="event-details">
                <button className='event-details--backbutton' onClick={props.handleBackClick}>&lt; <span>back</span></button>
                <div className="event-details--title">
                    <h2 className="event-details--title--text">
                        {eventDetail?.name}
                    </h2>
                    <p className="event-details-favorite-icon" onClick={addToFavorites}>
                        {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
                    </p>
                </div>
                <Tabs
                    value={activeTab}
                    onChange={handleTabs}
                    textColor="inherit"
                    indicatorColor="primary"
                    className='event-detail-tab-panal'
                    centered
                >
                    <Tab label='Events' />
                    <Tab label='Venue' />
                </Tabs>
                {activeTab === 0 && (<EventTab eventDetail={eventDetail} artistElements={artistElements} />)}
                {activeTab === 1 && (<VenueTab eventDetail={eventDetail} />)}
            </div>
            : <div className="loader">Loading...</div>
    )
}

export default EventDetails;