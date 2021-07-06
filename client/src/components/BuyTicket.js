import React from 'react'
import './BuyTicket.css'

class BuyTicket extends React.Component{

    state = {}

    render(){
        return(
            <div>
                <button className='closeButton' onClick={this.props.close}>X</button>
                <h3>Buy Ticket</h3>
            </div>
        )
    }
}

export default BuyTicket