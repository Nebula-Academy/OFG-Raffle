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
import { squareConnection, generateIdempotency, updateTable } from './NetworkRequests';
// import { purple } from '@material-ui/core/colors';

class PaymentPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        errorMessages: [],
      }
    }
  
    cardNonceResponseReceived = async (errors, nonce, cardData, buyerVerificationToken) => {
      if (errors) {
        this.setState({ errorMessages: errors.map(error => error.message) })
        return
      }
      
      this.setState({ errorMessages: [] })
      alert("nonce created: " + nonce + ", buyerVerificationToken: " + buyerVerificationToken)
      //create square customer with this nonce
      //use network request squareconnection to post to /customers
      const idempotency_key = await generateIdempotency(this.props.user)
      console.log(idempotency_key)
      let customer = await squareConnection('POST', '/customers', {
      given_name:this.props.billingContact.givenName,
      family_name:this.props.billingContact.familyName,
      email_address:this.props.user.email,
      address: {
        "address_line_1": this.props.billingContact.addressLine1
      },
      idempotency_key
      // reference_id:this.props.user.member_id
    })
    console.log(customer)
    if (customer.errors){
      alert(customer.errors)
      return
    } else customer=customer.customer

      //create payment
    // await squareConnection('POST', '/payment')
    let payment = await squareConnection('POST', '/payments', {
          idempotency_key,
          amount_money:{amount:500,currency:'USD'},
          source_id:nonce, //this.props.user.credit_card_id,
          customer_id:customer.id,
          locationid:'LZW67XDNYNWPK',
          // note:'$5 Account Verification Fee',
          verification_token:buyerVerificationToken
      })
  
  console.log(payment);
  if (customer.errors){
    alert(customer.errors)
    return
  } else payment = payment.payment;
  console.log(payment)
        
      //add card to square customer
    // await squareConnection('POST',`/customers/${customer.id}/cards`)
    let card = await squareConnection('POST',`/cards`,{
          idempotency_key,
          source_id: nonce,
          cardholder_name:`${this.props.billingContact.givenName} ${this.props.billingContact.familyName}`,
          customer_id: customer.id,
          verification_token: buyerVerificationToken,
          card: {
            billing_address:{
              addess_line_1:this.props.billingContact.address,
              country:this.props.billingContact.country,
              first_name:this.props.billingContact.givenName,
              last_name:this.props.billingContact.familyName,
              postal_code:this.props.billingContact.postalCode,
            }
          }
      })
  
       //await squareConnection('POST', `/customers/${customer.id}/cards`)
      //update our database with customer.id which is square id
      updateTable('member', this.props.user.member_id,{
        square_id: customer.id,
        donated: true,
        credit_card_id: card.id
      } )
    }
  
    createVerificationDetails = () => {
      return {
        amount: '5.00',
        currencyCode: "USD",
        intent: "CHARGE",
        billingContact: this.props.billingContact
        // billingContact: {
        //   familyName: "Smith",
        //   givenName: "John",
        //   email: "jsmith@example.com",
        //   country: "GB",
        //   city: "London",
        //   addressLines: ["1235 Emperor's Gate"],
        //   postalCode: "SW7 4JA",
        //   phone: "020 7946 0532"
        // }
      }
    }
  
    render()  {
      // console.log(await generateIdempotency(this.props.user))
      return (
        <div>
          {/* <h1>Payment Page</h1> */}
  
          <SquarePaymentForm
            sandbox={true}
            applicationId='sandbox-sq0idb--cW87B_bDCIx4xAtrUwKlQ'
            locationId='LZW67XDNYNWPK'
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