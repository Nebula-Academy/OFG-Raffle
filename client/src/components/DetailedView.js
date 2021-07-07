import React from 'react'
import './DetailedView.css'
import { Link } from 'react-router-dom'
import { getTableById } from './NetworkRequests'
import Modal from '@material-ui/core/Modal'
import UpdateRaffle from './UpdateRaffle'
import TicketBar from './TicketBar'
import BuyTicket from './BuyTicket'


class DetailedView extends React.Component {

    state = {
        raffle: {},
        category: '',
        UpdateRaffleModal: false,
        BuyTicketModal: false
    }

    componentDidMount() {
        this.refresh();
    }

    refresh = async () => {
        const { id } = this.props.match.params;
        const raffle = await getTableById("raffle", id);
        const category = await getTableById("category", raffle.category_id)
        this.setState({ raffle, category: category.category_name })
    }

    openUpdateRaffleModal = () => {
        this.setState({ UpdateRaffleModal: true })
    }

    closeUpdateRaffleModal = () => {
        this.setState({ UpdateRaffleModal: false })
    }

    openBuyTicketModal = () => {
        this.setState({ BuyTicketModal: true })
    }

    closeBuyTicketModal = () => {
        this.setState({ BuyTicketModal: false })
    }
    render() {
        console.log(this.state.raffle, this.props.user, "<--- user")
        return (
            <div className='detailed-view-wrap'>
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
                        <UpdateRaffle 
                            close={this.closeUpdateRaffleModal} 
                            refresh={this.refresh} 
                            raffle={this.state.raffle} />
                    </Modal> 
                <button className='updateRaffle' onClick={this.openUpdateRaffleModal}>Update Raffle</button> 
                <div className='detailed-view-item-wrap'>
                    <h3 className='itemTitle'>
                        {this.state.raffle.title}
                    </h3>
                    <img className='raffleItem' src={this.state.raffle.image_file_path} />
                     <div className='itemInfo'>
                     <p>Ticket Price: ${this.state.raffle.ticket_price}</p>
                        <TicketBar tickets_sold={this.state.raffle.tickets_sold} total_tickets={this.state.raffle.total_tickets} />
                      <p> {this.state.raffle.raffle_description}</p>
                      <p> Category: {this.state.category} </p>
                    </div> 
                    <div className='buttonWrapper'>
                        <Modal
                            className='modal'
                            open={this.state.BuyTicketModal}
                            onClose={this.closeBuyTicketModal}
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description" 
                        >
                            <BuyTicket close={this.closeBuyTicketModal} refresh={this.refresh} raffle={this.state.raffle} user={this.props.user}></BuyTicket>
                        </Modal>
                        <button className='purchaseButton' onClick={this.openBuyTicketModal}>Buy Ticket</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedView