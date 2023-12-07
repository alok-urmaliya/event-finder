import React from 'react'
import TicketStatus from './TicketStatus';
import { AiOutlineTwitter, AiFillFacebook } from "react-icons/ai";
import { EventDetail } from '../utils';

interface EventDataProps {
    eventDetail: EventDetail | undefined;
    artistElements: any[];
}

const EventTab: React.FC<EventDataProps> = ({ eventDetail, artistElements }) => {

    function shareToFacebook() {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(eventDetail?.url ?? '')}`, '_blank');
    };

    function shareToTwitter() {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check ${eventDetail?.name} on Ticketmaster`)}&url=${encodeURIComponent(eventDetail?.url ?? '')}`, '_blank');
    };

    return (
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
                {eventDetail?.priceranges && <div className="event-details-item">
                    <p className="label-detail">Price Ranges</p>
                    <p className="event-details-item-text">{eventDetail?.priceranges} USD</p>
                </div>}
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
}

export default EventTab;