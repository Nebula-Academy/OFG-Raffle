import React from 'react'
import './AccountVerification.js';
import './AccountVerification.css';
import PaymentPage from './PaymentPage';

class AccountVerification extends React.Component {

    state = {

    }

    updateChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
        return (
            <div id='main-container' className='account-verification'>
                <h1>Account Verification</h1>
                <h3>Please make a $5 donation in order to verify your account</h3>
                <h3 className='thanks'>Thank you!</h3>

                <div className="row">
                    <div className='column box'>

                            <input onChange={this.updateChange} name='givenName' placeholder="First Name"></input>
                            <input onChange={this.updateChange} name='familyName' placeholder="Last Name"></input>
                            <input onChange={this.updateChange} name='country' placeholder="Country"></input>
                            <input onChange={this.updateChange} name='city' placeholder="City"></input>
                            <input onChange={this.updateChange} name='addressLine1' placeholder="Billing Address"></input>
                            <input onChange={this.updateChange} name='addressLine2' placeholder="Billing Address 2"></input>
                            <input onChange={this.updateChange} name='postalCode' placeholder="Zip Code"></input>
                            <input onChange={this.updateChange} name='phone' placeholder="Phone Number"></input>
                            <PaymentPage billingContact={this.state} user={this.props.user}/>
                    </div>
                            {/* <div id="card-div"> */}
                            {/* </div> */}
                        </div>
                    </div>
            )
    }

}
export default AccountVerification