import './App.css';
import Header from './components/Header';
import MemberDashboard from './components/MemberDashboard';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import DetailedView from './components/raffles/DetailedView';
import GridView from './components/raffles/GridView';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import AccountVerification from './components/AccountVerification';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import PaymentPage from './components/PaymentPage';
import { getCurrentAuthUser, signOut } from './amplifyAuth/amplifyAuth';
import React from 'react';
import { getMember } from './components/NetworkRequests';

Amplify.configure(awsconfig);

class App extends React.Component {
  state = { cognitoUser: null, apiUser: null, signedIn: false };

  componentDidMount(){
    // Check for user sign in
    this.checkForSignedInUser()
  }

  checkForSignedInUser = () => {
    getCurrentAuthUser().then(async cognitoUser => {
      console.log(cognitoUser, "<-- cog")
      if(cognitoUser?.attributes.email_verified){
        const memberArr = await getMember(cognitoUser.attributes.email);
        const apiUser = memberArr[0];
        console.log(cognitoUser, "<--- cognito user")
        console.log(apiUser, "<--- api user")
        apiUser ? this.setState({cognitoUser, apiUser, signedIn: true}) : alert('error getting api user');
      } else {
        this.setState({ signedIn: false })
      }
    }); 
  }

  componentDidUpdate(prevprops, prevState){
    if(prevState.signedIn !== this.state.signedIn){
      console.log("checked...")
      this.checkForSignedInUser();
    }
  }

  signOutSwitch = async () => {
    await signOut();
    this.setState({ cognitoUser: null, apiUser: null, signedIn: false });
  }

  signInSwitch = () => {
    this.setState({ signedIn: true });
  }

  render(){
    return (
      <BrowserRouter>
        <Header signOutSwitch={this.signOutSwitch} signedIn={this.state.signedIn} />
        <Route exact path="/signup">
          <LoginPage signInSwitch={this.signInSwitch} />
        </Route>
        <Route exact path="/accountverification">
          <AccountVerification />
        </Route>
        <Route path="/myprofile">
          <MemberDashboard user={this.state.apiUser} />
        </Route>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/paymentpage">
        <PaymentPage user={this.state.apiUser}/>
      </Route>
        <Route path="/raffles">
          <GridView user={this.state.apiUser} />
        </Route>
        <Route path="/raffle/:id" component={DetailedView} />
      </BrowserRouter>
    );
  }
}

export default App;