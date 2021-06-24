import React from 'react'
import './GridView.css' 

class GridView extends React.Component{
    state = {
        raffleItems: [
            {
                title: 'Laptop',
                img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE3oYjc?ver=e1aa&q=90&m=6&h=200&w=200&b=%23FFFFFFFF&o=f&aim=true',
                ticketsSold: '100/83',
                ticketPrice: '$5'
            },
            {
                title: 'Laptop',
                img: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE3oYjc?ver=e1aa&q=90&m=6&h=200&w=200&b=%23FFFFFFFF&o=f&aim=true',
                ticketsSold: '100/83',
                ticketPrice: '$5'
            },
            {
                title: 'TV',
                img: 'placeholder',
                ticketsSold: '100/65',
                ticketPrice: '$10'
            },
            {
                title: 'Car',
                img: 'placeholder',
                ticketsSold: '100/47',
                ticketPrice: '$100'
            }
        ]
    }


    render(){
        return(
            <div id='grid'>
                {this.state.raffleItems.map(raffleItem => <div className='itemContainer' key={raffleItem.title}>  
                <h3 className='ItemName'> {raffleItem.title}</h3>
                <img className='ItemImg' src={raffleItem.img}></img>
                <div className='TicketHolder'>
                <p className='Tickets'> {raffleItem.ticketsSold}</p>
                
                <p className='Tickets'>{raffleItem.ticketPrice}</p>
                </div>
                <div className='GoTo'>
                <button>View</button>
                </div>
                </div>)}
            </div>
        )
    }
}

export default GridView