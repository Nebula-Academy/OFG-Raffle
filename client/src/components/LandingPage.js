import React from 'react';
import './LandingPage.css';
import {getTable} from './NetworkRequests';
import {Link} from 'react-router-dom';

class LandingPage extends React.Component {
    state = {
        currRaffles: [],
        pastWinners: []
    }

    componentDidMount() {
        // here we're fetching raffles from our database
        // then we're setting our state with those raffles
        getTable("raffle")
        .then(res => this.setState({currRaffles:res})) // reaching into database grabbing info requeated then setting state/swtiching array from an 
        // need to make network request that finds the past raffle winners associated with winners table
        // getTable('winner')
        // .then(res => this.setState({pastWinners:res}))
    }
    //network request hitting our api which is reaching into database, grabbing info requested then sending it back to our component(landing page) 
   //.then, sets state, inputting data from the database, setting state/swtiching the currRaffle array from an empty to one with information
   // component re-renders because setState does that by default

    currentRaffles() {
        //iterating over the array with the information which gives you the display
        return this.state.currRaffles.map(raffle => (
            <Link to={`raffle/${raffle.raffle_id}`}  key={raffle.raffle_id}>
                <div className="current-raffle-card">
                    <img src={raffle.image_file_path}/>
                    <h2> {raffle.title} </h2>
                    <p> ${raffle.ticket_price} per ticket</p>
                </div>
            </Link>
        ))
    }

    pastWins() {
        if(!this.state.pastWinners.length) return <p>No winners yet you could be first!</p>
        return this.state.pastWinners.map(raffle => (
            <div className="past-winners-card" key={raffle.raffle_id}>
                <img src={raffle.image_file_path}/>
            </div>
        ))
    }

    render() {
        return (
            <div id='main-container'>
                <div className='box'>
                    <div className='box-background'>
                        <div className='box-header'></div>
                        <div className='box-body'></div>
                    </div>
                    <h1>Our Future Generation: Raffles</h1>
                    <div className="row">
                        <div className='column-box'>
                            <h2>Current Raffles</h2>
                            <div className="current-raffles-container"> 
                                {this.currentRaffles()}
                            </div>
                        </div>
                        <div className="column-box">
                            <h2>Past Winners</h2>
                            <div className="past-winners-container">
                                {this.pastWins()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LandingPage;