import './App.css';
import Header from './components/Header';
import MemberDashboard from './components/MemberDashboard';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import DetailedView from './components/DetailedView';
import GridView from './components/GridView';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import AccountVerification from './components/AccountVerification';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { getSession, checkForUser, getCurrentAuthUser, signOut } from './amplifyAuth/amplifyAuth';
// import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import { getMember } from './components/NetworkRequests';

Amplify.configure(awsconfig);

class App extends React.Component {
  state = { cognitoUser: null, apiUser: null, signedIn: false };

  componentDidMount(){
    // Check for user sign in
    getCurrentAuthUser().then(async cognitoUser => {
      console.log(cognitoUser, "<-- cog")
      // If a user is already signed in, save that user to state.
      if(cognitoUser?.attributes.email_verified){
        // console.log(cognitoUser.signInUserSession.accessToken.jwtToken, "<-- token");
        const memberArr = await getMember(cognitoUser.attributes.email);
        const apiUser = memberArr[0];
        console.log(cognitoUser, "<--- cognito user")
        console.log(apiUser, "<--- api user")
        // Get user data from API and save to state (along with cognitoUser info)
        apiUser ? this.setState({cognitoUser, apiUser, signedIn: true}) : alert('error getting api user');
      } else {
        this.setState({ signedIn: false })
      }
      
    });  
    // Otherwise no one is logged in.
  }

  signOut = () => {
    signOut();
    this.setState({ cognitoUser: null, apiUser: null, signedIn: false });
  }

  render(){
    return (
      <BrowserRouter>
        <Header signOut={this.signOut} signedIn={this.state.signedIn} />
        <Route exact path="/signup">
          {/* <AmplifySignOut /> */}
          <LoginPage />
        </Route>
        <Route exact path="/accountverification">
          <AccountVerification />
        </Route>
        <Route path="/memberinfo">
          <MemberDashboard user={this.state.apiUser} />
        </Route>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/raffles">
          <GridView />
        </Route>
        <Route path="/raffle/:id" component={DetailedView} />
      </BrowserRouter>
    );
  }
}

// export default withAuthenticator(App);
export default App;