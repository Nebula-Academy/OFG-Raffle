import React from 'react'
import './GridView.css' 
import {getTable} from './NetworkRequests'
import { Link } from 'react-router-dom' 

class GridView extends React.Component{
    state = {
        raffleItems: []
    }

    async componentDidMount(){
        const raffleItems = await getTable("raffle");
        this.setState({raffleItems});
    };

    render(){
        return(
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
        )
    }
}

export default GridView