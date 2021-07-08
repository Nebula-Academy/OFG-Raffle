import React from 'react'
import './LandingPage.css'
import {getTable} from './NetworkRequests'

class LandingPage extends React.Component {
    state = {
        currRaffles: [],
        pastWinners: []
    }

    componentDidMount() {
        // here we're fetching raffles from our database
        // then we're setting our state with those raffles
        getTable("raffle")
        .then(res => this.setState({currRaffles:res}))
        // need to make network request that finds the past raffle winners associated with winners table
        // getTable('winner')
        // .then(res => this.setState({pastWinners:res}))
    }

    currentRaffles() {
        return this.state.currRaffles.map(raffle => (
            <div className="current-raffle-card">
                <img src={raffle.image_file_path}/>
                <h2> {raffle.title} </h2>
                <p> {raffle.ticket_price} </p>
                <button>test</button>
            </div>
        ))

    }

    pastWins() {
        return this.state.pastWinners.map(raffle => (
            <div className="past-winners-card">
                <img src={raffle.image_file_path}/>
            </div>
        ))
    }

    render() {
        return (
            <div id='main-container'>


                <h1>Welcome To Our Future Generation </h1>
                <h1>Raffles</h1>
                <div className="row">
                    <div className='column-box'>
                        <h4>Current Raffles</h4>
                        <div className="current-raffles-container"> 
                            {this.currentRaffles()}
                        </div>
                    </div>
                    <div className="column-box">
                        <h4>Past Winners</h4>
                        <div className="past-winners-container">
                            {this.pastWins()}
                        </div>
                    </div>
                </div>

                <button id="register">REGISTER TO ENTER</button>
                <button id="login">LOGIN</button>
            </div>
        )
    }
}

export default LandingPage