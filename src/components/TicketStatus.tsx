import React from 'react'

const TicketStatus = (props: any) => {
    const [ticketStatus, setTicketStatus] = React.useState(props.ticketstatus);

    React.useEffect(() => {
        if (props.ticketstatus == 'onsale') {
            setTicketStatus("On Sale")
        }
        else if (props.ticketstatus == 'offsale') {
            setTicketStatus("Off Sale")
        }
        else if (props.ticketstatus == 'canceled') {
            setTicketStatus("Canceled")
        }
        else if (props.ticketstatus == 'postponed') {
            setTicketStatus("Postponed")
        }
        else if (props.ticketstatus == 'rescheduled') {
            setTicketStatus("Rescheduled")
        }
        else {
            setTicketStatus('Off sale')
        }
    }, [props.ticketstatus])

    return (
        <p className={`status-code${props.ticketstatus}`}>{ticketStatus}</p>
    )
}

export default TicketStatus;