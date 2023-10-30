import React, { useEffect } from 'react'
import { Tabs, Tab } from '@mui/material'
import '../styles/EventDetails.css'
import axios from 'axios'
import { EventDetail } from '../utils'
import { Artist } from '../utils'
import TicketStatus from './TicketStatus'
import { AiOutlineTwitter, AiFillFacebook } from "react-icons/ai";
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

const EventDetails = (props: any) => {
    const [activeTab, setActiveTab] = React.useState(0)
    const [selectedEvent] = React.useState(props.event);
    const [eventJson, setEventJson] = React.useState<any>();
    const [eventDetail, setEventDetail] = React.useState<EventDetail | null>();

    const [showMoreHours, setShowMoreHours] = React.useState(false)
    const [showMoreGeneral, setShowMoreGeneral] = React.useState(false)
    const [showMoreChildRule, setShowMoreChildRule] = React.useState(false)

    const [artistElements, setArtistElements] = React.useState<any[]>([])

    const [isFavorite, setIsFavorite] = React.useState(false)

    useEffect(() => {
        (async () => {
            const response = selectedEvent != ''
                ? await axios.get('http://127.0.0.1:8000/eventdetail', { params: { "id": selectedEvent } })
                    .then(res => res.data)
                    .then((res: any) => setEventJson(res))
                : null
        })()
    }, [selectedEvent])

    useEffect(() => {
        const artists: Artist[] = eventJson?._embedded.attractions?.map((att: any) => ({ name: att.name, url: att.url }))
        setArtistElements(artists?.map(artist => {
            return (<a href={artist.url ?? ''} target='_blank' className="event-details-item-text event-details-item-artists">{artist.name + ' | '}</a>)
        }))
        const tempEventDetail = eventJson != null ? new EventDetail(
            eventJson.id,
            eventJson.name,
            eventJson.url,
            eventJson.dates?.start?.localDate + ' ' + eventJson.dates?.start?.localTime,
            artists,
            eventJson._embedded?.venues && eventJson._embedded?.venues?.length > 0 ? eventJson._embedded?.venues[0]?.name : null,
            (eventJson.classifications[0]?.segment?.name + '|' + eventJson.classifications[0]?.genre?.name + '|' + eventJson.classifications[0]?.subGenre?.name + '|' + eventJson.classifications[0]?.type?.name + '|' + eventJson.classifications[0]?.subType?.name) || null,
            (eventJson.priceRanges[0]?.min + '-' + eventJson.priceRanges[0]?.max) || null,
            eventJson.dates?.status?.code || null,
            eventJson?._embedded?.attractions[0]?.url || '',
            eventJson.seatmap?.staticUrl || null,
            eventJson._embedded?.venues[0].name || null,
            (eventJson._embedded?.venues && eventJson._embedded?.venues[0]?.address?.line1 + (eventJson._embedded?.venues[0]?.city?.name || '')) || null,
            eventJson._embedded?.venues[0]?.boxOfficeInfo?.phoneNumberDetail || null,
            eventJson._embedded?.venues[0]?.boxOfficeInfo?.openHoursDetail || null,
            eventJson._embedded?.venues[0]?.generalInfo?.generalRule || null,
            eventJson._embedded?.venues[0]?.generalInfo?.childRule || null
        ) : null;
        setEventDetail(tempEventDetail)
    }, [eventJson])

    function handleTabs(e: any, value: any) {
        setActiveTab(value)
    }

    function shareToFacebook() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventDetail?.url ?? '')}`, '_blank');
    };

    function shareToTwitter() {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check ${eventDetail?.name} on Ticketmaster`)}&url=${encodeURIComponent(eventDetail?.url ?? '')}`, '_blank');
    };

    const Event = (
        <div className="event-details--event">
            <div className="event-details--event-data">
                <div className="event-details-item">
                    <p className="label-detail">Date</p>
                    <p className="event-details-item-text">{eventDetail?.date}</p>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Artist/Team</p>
                    <div className="artist-elements">
                        {artistElements}
                    </div>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Venue</p>
                    <p className="event-details-item-text">{eventDetail?.venue}</p>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Genres</p>
                    <p className="event-details-item-text">{eventDetail?.genre}</p>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Price Ranges</p>
                    <p className="event-details-item-text">{eventDetail?.priceranges} USD</p>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Ticket Status</p>
                    <TicketStatus ticketstatus={eventDetail?.ticketstatus} />
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Buy Ticket at</p>
                    <a href={eventDetail?.buyticketlink ?? ''} className='event-detail-item-link' target='_blank'>Ticketmaster</a>
                </div>
            </div>
            <div className="event-details--event-seatmap">
                <img src={eventDetail?.seatmapimgurl ?? ''} alt="seat map image" width={350} height={350} />
            </div>
            <div className="event-details--links">
                <p className="event-details--links-text">Share on:</p>
                <a href="https://twitter.com" target="_blank" className="twitter-icon event-detail-icons" onClick={shareToTwitter}><AiOutlineTwitter /></a>
                <a href="https://facebook.com" target="_blank" className="facebook-icon event-detail-icons" onClick={shareToFacebook}><AiFillFacebook /></a>
            </div>
        </div>
    )

    const Venue = (
        <div className="venue-details-container">
            < div className="venue-details" >
                <div className="venue-details--left">
                    <div className="event-details-item">
                        <p className="label-detail">Name</p>
                        <p className="venue-details-item-text">{eventDetail?.venueData?.name}</p>
                    </div>
                    <div className="event-details-item">
                        <p className="label-detail">Address</p>
                        <p className="venue-details-item-text">{eventDetail?.venueData?.address}</p>
                    </div>
                    <div className="event-details-item">
                        <p className="label-detail">Phone Number</p>
                        <p className="venue-details-item-text">{eventDetail?.venueData?.phonenumber}</p>
                    </div>
                </div>
                <div className="venue-details--right">
                    <div className="event-details-item">
                        <p className="label-detail">Open Hours</p>
                        <p className="venue-details-item-text">
                            {showMoreHours ? eventDetail?.venueData?.openhours : `${eventDetail?.venueData?.openhours?.substring(0, 150)}`}
                        </p>
                        {(eventDetail?.venueData?.openhours?.length ?? 1) > 150 &&
                            (<button className="show-more-btn" onClick={() => setShowMoreHours(!showMoreHours)}>{showMoreHours ? "Showless" : "Showmore"}</button>)
                        }
                    </div>
                    <div className="event-details-item">
                        <p className="label-detail">General Rule</p>
                        <p className="venue-details-item-text">
                            {showMoreGeneral ? eventDetail?.venueData?.generalrule : `${eventDetail?.venueData?.generalrule?.substring(0, 150)}`}
                        </p>
                        {(eventDetail?.venueData?.generalrule?.length ?? 1) > 150 &&
                            (<button className="show-more-btn" onClick={() => setShowMoreGeneral(!showMoreGeneral)}>{showMoreGeneral ? "Showless" : "Showmore"}</button>)
                        }
                    </div>
                    <div className="event-details-item">
                        <p className="label-detail">Child Rule</p>
                        <p className="venue-details-item-text">
                            {showMoreChildRule ? eventDetail?.venueData?.childrule : `${eventDetail?.venueData?.childrule?.substring(0, 150)}`}
                        </p>
                        {(eventDetail?.venueData?.childrule?.length ?? 1) > 150 &&
                            (<button className="show-more-btn" onClick={() => setShowMoreChildRule(!showMoreChildRule)}>{showMoreChildRule ? "Showless" : "Showmore"}</button>)
                        }
                    </div>
                </div>
            </div>
            <div className="event-details--maps">
                <button className='event-details--maps-button'>Show venue on google maps</button>
            </div>
        </div>

    )

    function addToFavorites() {
        const favoriteListString = localStorage.getItem('favoriteList')
        const favoriteList: any[] = favoriteListString != null ? JSON.parse(favoriteListString) : []

        const newFavoriteElement = {
            id: eventDetail?.id,
            date: eventDetail?.date,
            event: eventDetail?.name,
            genre: eventDetail?.genre,
            venue: eventDetail?.venue,
        }

        favoriteList.push(newFavoriteElement)
        localStorage.setItem('favoriteList', JSON.stringify(favoriteList))
    }

    return (
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
            {activeTab == 0 && (Event)}
            {activeTab == 1 && (Venue)}
        </div>
    )
}

export default EventDetails;