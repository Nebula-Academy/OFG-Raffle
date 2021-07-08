import React from 'react'
import './BuyTicket.css'
import BuyTicketSlider from './BuyTicketSlider' 


class BuyTicket extends React.Component{

    state = {

        progress: 1
    }

    handleSlide = newProgress => this.setState({ progress: newProgress })



    render(){
        return(
            <div>
                <button className='closeButton' onClick={this.props.close}>X</button>
                <h4>Ticket Price ${this.props.raffle.ticket_price}</h4>
                <BuyTicketSlider raffle={this.props.raffle} user={this.props.user} refresh={this.props.refresh} closeWindow={this.props.closeWindow}/>
            </div>
        )
    }
}

export default BuyTicket


