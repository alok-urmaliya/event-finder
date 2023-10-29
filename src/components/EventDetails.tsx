import React, { useEffect } from 'react'
import { Tabs, Tab } from '@mui/material'
import '../styles/EventDetails.css'
import axios from 'axios'
import img from './logo512.png'
import { EventDetail } from '../utils'

const EventDetails = (props: any) => {
    const [activeTab, setActiveTab] = React.useState(0)
    const [selectedEvent] = React.useState(props.event);
    const [eventJson, setEventJson] = React.useState<any>();
    const [eventDetail, setEventDetail] = React.useState<EventDetail | null>();

    const name = 'P!NK: Summer Carnival 2023'

    const eventData = {
        dateTime: '2023-08-09 18:00:00',
        team: 'Alok | Kumar | Urmaliya',
        venue: 'Manas bhavan jabalpur',
        genres: 'Music | Sports | Film',
        priceranges: '500-2000',
        ticketstatus: 'onsale',
        buyticketat: 'google.com',
        venueData: {
            name: 'Cameron Park',
            address: 'Jabalpur, madhya pradesh 482002',
            phonenumber: '213-742-7340',
            openhours: 'Box office is located on North side of building at 11th and South Figueroa. Box office hours are 10am to 6pm, Monday through Saturday. It is open extended hours on event day. Phone: 213-742-7340 SUMMER HOURS Closed Saturdays and Sundays unless there is an event, the box office will open at 9am on Saturdays or 10am on Sundays only if there is an event. The box office will have extended hours on all event days.',
            generalrule: 'No Bottles, Cans, Or Coolers. No Smoking In Arena. No Cameras Or Recording Devices At Concerts! Cameras w/No Flash Allowed For Sporting Events Only!',
            childrule: 'Some events require all attendees, regardless of age, to present a ticket for entry. Please check the event ticket policies at the time of purchase. Children age three (3) and above require a ticket for Los Angeles Lakers, Los Angeles Clippers, Los Angeles Kings and Los Angeles Sparks games.'
        }
    }

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
        const tempEventDetail = eventJson != null ? new EventDetail(
            eventJson.name,
            eventJson.dates?.localDate + ' ' + (eventJson.dates?.localTime || ''),
            '',
            eventJson._embedded?.venues && eventJson._embedded?.venues?.length > 0 ? eventJson._embedded?.venues[0]?.name : null,
            (eventJson.classifications[0]?.segment?.name + '|' + eventJson.classifications[0]?.genre?.name + '|' + eventJson.classifications[0]?.subGenre?.name + '|' + eventJson.classifications[0]?.type?.name + '|' + eventJson.classifications[0]?.subType?.name) || null,
            (eventJson.priceRanges[0]?.min + '-' + eventJson.priceRanges[0]?.max) || null,
            eventJson.dates?.status?.code || null,
            'google.com' || null,
            eventJson.seatmap?.staticUrl || null,
            eventJson._embedded?.venues[0].name || null,
            (eventJson._embedded?.venues && eventJson._embedded?.venues[0]?.address?.line1 + (eventJson._embedded?.venues[0]?.city?.name || '')) || null,
            eventJson._embedded?.venues[0]?.boxOfficeInfo?.phoneNumberDetail || null,
            eventJson._embedded?.venues[0]?.boxOfficeInfo?.openHoursDetail || null,
            eventJson._embedded?.venues[0]?.generalInfo?.generalRule || null,
            eventJson._embedded?.venues[0]?.generalInfo?.childRule || null
        ) : null;
        setEventDetail(tempEventDetail)
        console.log(tempEventDetail)
    }, [eventJson])

    function handleTabs(e: any, value: any) {
        setActiveTab(value)
    }

    const Event = (
        <div className="event-details--event">
            <div className="event-details--event-data">
                <div className="event-details-item">
                    <p className="label-detail">Date</p>
                    <p className="event-details-item-text">{eventDetail?.date}</p>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Artist/Team</p>
                    <p className="event-details-item-text">{eventDetail?.artists}</p>
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
                    <p className="event-details-item-text">{eventDetail?.priceranges}</p>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Ticket Status</p>
                    <p className="event-details-item-text">{eventDetail?.ticketstatus}</p>
                </div>
                <div className="event-details-item">
                    <p className="label-detail">Buy Ticket at</p>
                    <a href={eventDetail?.buyticketlink ?? ''} target='_blank'>Ticketmaster</a>
                </div>
            </div>
            <div className="event-details--event-seatmap">
                <img src={eventDetail?.seatmapimgurl ?? ''} alt="seat map image" width={350} height={350} />
            </div>
            <div className="event-details--links">
                <p className="event-details--links-text">Share on:</p>
                <a href='' className="twitter-icon">twitter</a>
                <a href="" className="facebook-icon">facebook</a>
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
                        <p className="venue-details-item-text">{eventDetail?.venueData?.openhours}</p>
                    </div>
                    <div className="event-details-item">
                        <p className="label-detail">General Rule</p>
                        <p className="venue-details-item-text">{eventDetail?.venueData?.generalrule}</p>
                    </div>
                    <div className="event-details-item">
                        <p className="label-detail">Child Rule</p>
                        <p className="venue-details-item-text">{eventDetail?.venueData?.childrule}</p>
                    </div>
                </div>
            </div>
            <div className="event-details--maps">
                <button className='event-details--maps-button'>Show venue on google maps</button>
            </div>
        </div>

    )

    return (
        <div className="event-details">
            <button className='event-details--backbutton' onClick={props.handleBackClick}>&lt; <span>back</span></button>
            <div className="event-details--title">
                <h2 className="event-details--title--text">
                    {eventDetail?.name} {/*PUT VALUE HERE*/}
                </h2>
            </div>
            <Tabs
                value={activeTab}
                onChange={handleTabs}
                textColor="inherit"
                indicatorColor="secondary"
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