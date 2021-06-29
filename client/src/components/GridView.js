import React from 'react'
import './GridView.css'
import { getTable } from './NetworkRequests'
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import AddRaffle from './AddRaffle'

class GridView extends React.Component {
    state = {
        raffleItems: [],
        addRaffleModal: false
    }

    componentDidMount(){
        this.refresh();
    }

    refresh = async () => {
        const raffleItems = await getTable("raffle");
        this.setState({ raffleItems });
    };

    openAddRaffleModal = () => {
        this.setState({ addRaffleModal: true })
    }

    closeAddRaffleModal= () => {
        this.setState({ addRaffleModal: false })

    }

    render() {
        return (

            <div>
                <Modal
                    className='modal'
                    open={this.state.addRaffleModal}
                    onClose={this.closeAddRaffleModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <AddRaffle close={this.closeAddRaffleModal} refresh={this.refresh}/>
                </Modal>
                <button className='createRaffle' onClick={this.openAddRaffleModal}> Create Raffle </button>
                <div id='grid'>
                    {this.state.raffleItems.map(raffleItem => <div className='itemContainer' key={raffleItem.title}>
                        <h3 className='ItemName'> {raffleItem.title}</h3>
                        <img className='ItemImg' src={raffleItem.image_file_path}></img>
                        <div className='TicketHolder'>
                            <p className='Tickets'> {raffleItem.tickets_sold}/{raffleItem.total_tickets}</p>

                            <p className='Tickets'>${raffleItem.ticket_price}</p>
                        </div>
                        <div className='GoTo'>
                            <Link to={`/raffle/${raffleItem.raffle_id}`}>
                                <button>View</button>
                            </Link>
                        </div>
                    </div>)}
                </div>
            </div>

        )
    }
}

export default GridView