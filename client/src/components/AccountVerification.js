import React from 'react'
import './AccountVerification.js';
import './AccountVerification.css';
class AccountVerification extends React.Component {
    render() {
        return (
            <div id='main-container'>
                <h1>All Information Required</h1>

                <div className="row">
                    <div className='column box'>
                        <div id="name-div">
                            <label>Name</label>

                            <input id="name" placeholder="First Name"></input>
                            <input id="name" placeholder="Last Name"></input>
                            <input id="name" placeholder="Name on Card"></input>

                            <div id="card-div">
                                <label>Card</label>

                                <input className="card" placeholder="Card Number"></input>
                                <input className="card" placeholder="mm/yr"></input>
                                <input className="card" placeholder="cvc#"></input>
                                <input className="card" placeholder="email"></input>
                                <input className="card" placeholder="billing address"></input>
                                <button>ADD</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
    }

}
export default AccountVerification