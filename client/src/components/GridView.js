import React from 'react'
import './GridView.css'
import { getTable } from './NetworkRequests'
import { Link } from 'react-router-dom'
import Modal from '@material-ui/core/Modal'
import AddRaffle from './AddRaffle'
import RaffleCategories from './RaffleCategories'
import EditCategories from './EditCategories'

class GridView extends React.Component {
    state = {
        raffleItems: [],
        addRaffleModal: false,
        editCategory: false,
        categories: []
    }

    componentDidMount() {
        this.refresh();
    }

    updateCategories = (categories) =>{
        this.setState({categories})
    }

    refresh = async (category_id) => {
        const holdResponse = await getTable('category')
        this.setState({categories: holdResponse})
        let raffleItems = await getTable("raffle");
        if (category_id) {
            raffleItems = raffleItems.filter(raffleItem => raffleItem.category_id == category_id)
        }
        this.setState({ raffleItems });
    };

    openAddRaffleModal = () => {
        this.setState({ addRaffleModal: true })
    }

    closeAddRaffleModal = () => {
        this.setState({ addRaffleModal: false })

    }

    openEditCategory = () => {
        this.setState({ editCategory: true })
    }

    closeEditCategory = () => {
        this.setState({ editCategory: false })

    }
    render() {
        return (

            <div>
                <Modal
                    className='modal createRaffleModal'
                    open={this.state.addRaffleModal}
                    onClose={this.closeAddRaffleModal}
                >
                    <AddRaffle close={this.closeAddRaffleModal} refresh={this.refresh} />
                </Modal>
                <RaffleCategories refresh={this.refresh} categories={this.state.categories} />
                <Modal
                    className='modal'
                    open={this.state.editCategory}
                    onClose={this.closeEditCategory}
                >
                    <EditCategories close={this.closeEditCategory} refresh={this.refresh} categories={this.state.categories} updateCategories={this.updateCategories}/>
                </Modal>
                <button className='editButton' onClick={this.openEditCategory}>Edit Categories</button>
                <button className='createRaffle' onClick={this.openAddRaffleModal}> Create Raffle </button>
                <div id='grid'>
                    {this.state.raffleItems.map(raffleItem => <div className='itemContainer' key={raffleItem.title}>
                        <h3 className='ItemName'> {raffleItem.title}</h3>
                        <Link to={`/raffle/${raffleItem.raffle_id}`}>
                            <img className='ItemImg' src={raffleItem.image_file_path}></img>
                        </Link>
                        <div className='TicketHolder'>
                            <p className='Tickets'> {raffleItem.tickets_sold}/{raffleItem.total_tickets}</p>

                            <p className='Tickets'>${raffleItem.ticket_price}</p>
                        </div>
                    </div>)}
                </div>
            </div>

        )
    }
}

export default GridView