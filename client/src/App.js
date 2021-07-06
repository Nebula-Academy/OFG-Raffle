import './App.css';
import Header from './components/Header'
import MemberDashboard from './components/MemberDashboard';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import DetailedView from './components/DetailedView';
import GridView from './components/GridView';
import LoginPage from './components/LoginPage';
import LandingPage from './components/LandingPage';
import AccountVerification from './components/AccountVerification';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { getSession, checkForUser, getCurrentAuthUser } from './amplifyAuth/amplifyAuth';
import { AmplifySignOut, withAuthenticator } from '@aws-amplify/ui-react';
import React from 'react';
import { getMember } from './components/NetworkRequests';

Amplify.configure(awsconfig);

// Global state for user...
// We could check validation before each request...

// AUTH FLOW:
// Hit amplify with a sign in - if we are good to go then...
// grab that user from our members table, then save to app state,
// then there is no way for the user to manipulate the data...

// There should always be a two step process when making requests like buying tickets -
// authenticating user given their email and password in app state through Amplify and 
// matching that up with their session jwt? If all checks out, then they are able to make
// that request...

class App extends React.Component {
  state = { cognitoUser: null, apiUser: null };

  componentDidMount(){
    // Check for user sign in
    getCurrentAuthUser().then(async cognitoUser => {
      // If a user is already signed in, save that user to state.
      if(cognitoUser?.attributes.email_verified){
        console.log(cognitoUser.attributes);
        const memberArr = await getMember(cognitoUser.attributes.email);
        const apiUser = memberArr[0];
        console.log(apiUser, "<--- api user")
        // Get user data from API and save to state (along with cognitoUser info)
        apiUser ? this.setState({cognitoUser, apiUser}) : alert('error getting api user');
      }
    });  
    // Otherwise no one is logged in.
  }

  render(){
    return (
      <BrowserRouter>
        <Header verify={this.getSession} />
        <Route exact path="/signup">
          {/* <AmplifySignOut /> */}
          <LoginPage />
        </Route>
        <Route exact path="/accountverification">
          <AccountVerification />
        </Route>
        <Route path="/memberinfo">
          <MemberDashboard />
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