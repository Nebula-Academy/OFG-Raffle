import React from 'react'
import './DetailedView.css'
import { Link } from 'react-router-dom'
import { getTableById } from './NetworkRequests'

class DetailedView extends React.Component {

    state = {
        raffle: {}
    }

    async componentDidMount() {

        const { id } = this.props.match.params;
        const raffle = await getTableById("raffle", id);
        this.setState({ raffle })
    }

    render() {
        console.log(this.state.raffle)
        return (
            <div className='mainContianerWrapper'>
                <Link to={`/raffles`}>
                    <button>↩️</button>
                </Link>
                <div className='mainContianer'>
                    <h3 className='itemTitle'>
                        {this.state.raffle.title}
                    </h3>
                    <img className='raffleItem' src={this.state.raffle.image_file_path} />
                    <text className='itemInfo'>
                        Ticket Price: ${this.state.raffle.ticket_price}
                        <br />
                        <br />
                        {this.state.raffle.raffle_description}
                    </text>
                    <div className='ticketCounter'> {this.state.raffle.tickets_sold}/{this.state.raffle.total_tickets} </div>
                    <div className='buttonWrapper'>
                        <button className='purchaseButton'>Buy Ticket</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedView