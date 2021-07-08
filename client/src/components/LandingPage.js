import React from 'react'
import './LandingPage.css'

class LandingPage extends React.Component {
    state = {
        currRaffles: [],
    }

    componentDidMount() {
        // here we're fetching raffles from our database
        // then we're setting our state with those raffles

    }

    currentRaffles() {
        return this.state.currRaffles.map(raffle => (
            <div className="button1">
                <img src={raffle.image_file_path}/>
                <h2> {raffle.title} </h2>
                <p> {raffle.ticket_price} </p>
                <button>test</button>
            </div>
        ))
    }

    render() {
        return (
            <div id='main-container'>


                <h1>Welcome To Our Future Generation </h1>
                <h1>Raffles</h1>
                <div className="row">
                    <div className='column box'>
                        <h4>Current Raffles</h4>
                        {this.currentRaffles()}
                    </div>
                    <div className="column box">
                        <h4>Past Winners</h4>
                        <button>test</button>
                        <button>test</button>
                        <button>test</button>
                    </div>
                </div>

                <button id="register">REGISTER TO ENTER</button>
                <button id="login">LOGIN</button>
            </div>
        )
    }
}

export default LandingPage