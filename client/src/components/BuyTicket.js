import React from 'react'
import './BuyTicket.css'
import BuyTicketSlider from './BuyTicketSlider' 


class BuyTicket extends React.Component{

    state = {

        progress: 10
    }

    handleSlide = newProgress => this.setState({ progress: newProgress })



    render(){
        return(
            <div>
                <button className='closeButton' onClick={this.props.close}>X</button>
                <h3>Buy Ticket</h3>
                <h4>Ticket Price ${this.props.raffle.ticket_price}</h4>
                <BuyTicketSlider raffle={this.props.raffle}/>
            </div>
        )
    }
}

export default BuyTicket


