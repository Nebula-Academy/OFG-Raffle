import React from 'react'
import './TicketBar.css';
import './TicketBar.js';
class TicketBar extends React.Component {
    render() {
        return (
            <div className='TicketBar'>
                <div>Tickets Purchased To Date {this.props.tickets_sold}/{this.props.total_tickets}</div>
                <div id="ticket-bar">
                    <div id ="filled-ticket-bar" style={{width:this.props.tickets_sold/this.props.total_tickets*100+"%"}}/>
                </div>
            </div>
        )
    }
    
}
export default TicketBar 