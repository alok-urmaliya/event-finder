import React from 'react'
import { EventDetail } from '../utils'

interface VenueTabProps {
    eventDetail: EventDetail | undefined
}

const VenueTab: React.FC<VenueTabProps> = ({ eventDetail }) => {
    const [showMoreHours, setShowMoreHours] = React.useState(false)
    const [showMoreGeneral, setShowMoreGeneral] = React.useState(false)
    const [showMoreChildRule, setShowMoreChildRule] = React.useState(false)

    return (
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
}

export default VenueTab;