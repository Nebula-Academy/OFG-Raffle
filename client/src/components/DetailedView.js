import React from 'react'
import './DetailedView.css'
import { Link } from 'react-router-dom'
import { getTableById } from './NetworkRequests'
import Modal from '@material-ui/core/Modal'
import UpdateRaffle from './UpdateRaffle'
import TicketBar from './TicketBar'


class DetailedView extends React.Component {

    state = {
        raffle: {},
        UpdateRaffleModal: false
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = async () => {
        const { id } = this.props.match.params;
        const raffle = await getTableById("raffle", id);
        this.setState({ raffle })
    }

    openUpdateRaffleModal = () => {
        this.setState({ UpdateRaffleModal: true })
    }

    closeUpdateRaffleModal = () => {
        this.setState({ UpdateRaffleModal: false })
    }

    render() {
        console.log(this.state.raffle)
        return (
            <div className='mainContianerWrapper'>
                <Link to={`/raffles`}>
                    <button>↩️</button>
                </Link>

                <Modal 
                className='modal'
                open= {this.state.UpdateRaffleModal}
                Onclose= {this.closeUpdateRaffleModal} 
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description" 
                >
                    <UpdateRaffle close={this.closeUpdateRaffleModal} refresh={this.refresh} raffle={this.state.raffle}></UpdateRaffle>
                </Modal>
                <button className= 'updateRaffle' onClick={this.openUpdateRaffleModal}>Update Raffle</button> 
                <div className='mainContianer'>
                    
                    <h3 className='itemTitle'>
                        {this.state.raffle.title}
                    </h3>
                    <img className='raffleItem' src={this.state.raffle.image_file_path} />
                     <div className='itemInfo'>
                     <p>   Ticket Price: ${this.state.raffle.ticket_price}</p>
                        <TicketBar tickets_sold={this.state.raffle.tickets_sold} total_tickets={this.state.raffle.total_tickets} />
                      <p> {this.state.raffle.raffle_description}</p>
                    </div>
                    {/* <div className='ticketCounter'> {this.state.raffle.tickets_sold}/{this.state.raffle.total_tickets} </div> */} 
                    <div className='buttonWrapper'>
                        <button className='purchaseButton'>Buy Ticket</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedView