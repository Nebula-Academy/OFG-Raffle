import React from 'react';
import 'react-square-payment-form/lib/default.css';
import './PaymentPage.css';
import {
    SquarePaymentForm,
    CreditCardNumberInput,
    CreditCardExpirationDateInput,
    CreditCardPostalCodeInput,
    CreditCardCVVInput,
    CreditCardSubmitButton
  } from 'react-square-payment-form';
import { squareConnection } from './NetworkRequests';
// import { purple } from '@material-ui/core/colors';


class PaymentPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        errorMessages: [],
      }
    }
  
    cardNonceResponseReceived = (errors, nonce, cardData, buyerVerificationToken) => {
      if (errors) {
        this.setState({ errorMessages: errors.map(error => error.message) })
        return
      }
  
      this.setState({ errorMessages: [] })
      alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
      //create square customer with this nonce
    //const customer = await squareConnection('POST', '/customers')
        //use network request squareconnection to post to /customers
        //await squareConnection('POST', '/customers') //create new customer
      //create payment
    // await squareConnection('POST', '/payment')
        //await squareConnection('POST', '/payment')
      //add card to square customer
    // await squareConnection('POST',`/customers/${customer.id}/cards`)
       //await squareConnection('POST', `/customers/${customer.id}/cards`)
    }
  
    createVerificationDetails() {
      return {
        amount: '5.00',
        currencyCode: "USD",
        intent: "CHARGE",
        // billingContact: this.props.billingContact
        billingContact: {
          familyName: "Smith",
          givenName: "John",
          email: "jsmith@example.com",
          country: "GB",
          city: "London",
          addressLines: ["1235 Emperor's Gate"],
          postalCode: "SW7 4JA",
          phone: "020 7946 0532"
        }
      }
    }
  
    render() {
      return (
        <div>
          {/* <h1>Payment Page</h1> */}
  
          <SquarePaymentForm
            sandbox={true}
            applicationId={'sandbox-sq0idb-dv37SsdT8kNu5wWobl9Wcg'}
            locationId={'LHXB1K5PWKDEZ'}
            cardNonceResponseReceived={this.cardNonceResponseReceived}
            createVerificationDetails={this.createVerificationDetails}
          >
            <fieldset className="sq-fieldset">
            <CreditCardNumberInput />
            <div className="sq-form-third">
                <CreditCardExpirationDateInput />
            </div>
        
            <div className="sq-form-third">
                <CreditCardPostalCodeInput />
            </div>
            <div className="sq-form-third">
                <CreditCardCVVInput />
            </div>
            </fieldset>
        
            <CreditCardSubmitButton>
                Pay $5.00
            </CreditCardSubmitButton>
          </SquarePaymentForm>
  
          <div className="sq-error-message">
            {this.state.errorMessages.map(errorMessage =>
              <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
            )}
          </div>
  
        </div>
      )
    }
  }

  export default PaymentPage;