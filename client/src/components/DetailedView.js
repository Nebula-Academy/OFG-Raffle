import React from 'react'
import './DetailedView.css'

class DetailedView extends React.Component {




    changeTicketBar() {
        // ticketCounter.innertext = this.ticketsSold;
        // let width = this.ticketsSold / 
    }

    render() {
        return (
            <div className='mainContianerWrapper'>
                <div className='mainContianer'>
                    <h3 className='itemTitle'>
                        {/* {this.props.itemName}  */}
                        Laptop
                    </h3>
                    <img className='raffleItem' src='https://static.frame.work/pttnfnm54ipt03wzyqhzlwfk4f6t'>
                        {/* {this.props.img} should go in atributes? */}
                    </img>
                    <p className='itemInfo'>
                        This item is a place holder, It was provided by no one and has a market value of absolutely nothing. All proceedes from purchased tickets for this item will go directly into my back pocket
                        {/* {this.props.info} */}
                    </p>
                    <div className='ticketCounter'> 100/83 </div>
                    <div className='buttonWrapper'>
                        <button className='purchaseButton'>Buy Ticket</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DetailedView