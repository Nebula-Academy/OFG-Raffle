import React from 'react'
import './GridView.css' 

class GridView extends React.Component{
    state = {
        raffleItems: [
            {
                title: 'Laptop',
                img: 'placeholder',
                ticketsSold: '100/83',
                ticketPrice: '$5'
            },
            {
                title: 'Laptop',
                img: 'placeholder',
                ticketsSold: '100/83',
                ticketPrice: '$5'
            }
        ]
    }


    render(){
        return(
            <div id='grid'>
                {this.state.raffleItems.map(raffleItem => <div className='itemContainer' key={raffleItem.title}>  
                <h3 className='ItemName'> {raffleItem.title}</h3>
                <img className='ItemImg' src={raffleItem.img}></img>
                <p className='Tickets'> {raffleItem.title}</p>
                <p className='TicketPrice'>{raffleItem.ticketPrice}</p>
                <button className='GoTo'>View</button>
                </div>)}
            </div>
        )
    }
}

export default GridView