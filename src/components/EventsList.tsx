import React from 'react'

const EventsList = () => {
    const eventsList: Array<{
        Date: string;
        Icon: string;
        Event: string;
        Genre: string;
        Venue: string;
    }> = [
            {
                Date: "2023-11-01",
                Icon: "music",
                Event: "Concert 1",
                Genre: "Rock",
                Venue: "Rock Arena",
            },
            {
                Date: "2023-11-05",
                Icon: "sports",
                Event: "Sports Event 1",
                Genre: "Sports",
                Venue: "Sports Stadium",
            },
            {
                Date: "2023-11-10",
                Icon: "movie",
                Event: "Movie Night",
                Genre: "Cinema",
                Venue: "Cineplex Theater",
            },
            {
                Date: "2023-11-15",
                Icon: "music",
                Event: "Concert 2",
                Genre: "Pop",
                Venue: "Pop Concert Hall",
            },
            {
                Date: "2023-11-20",
                Icon: "theatre",
                Event: "Theater Play",
                Genre: "Drama",
                Venue: "Drama Theater",
            },
        ];

    return (
        < div className="events-list--container" >
            this is the removeEventListener
        </div >
    )
}

export default EventsList;