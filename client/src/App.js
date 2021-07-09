import './App.css';
import Header from './components/Header';
import MemberDashboard from './components/MemberDashboard';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import DetailedView from './components/DetailedView';
import GridView from './components/GridView';
import LandingPage from './components/LandingPage'
import AccountVerification from './components/AccountVerification'
import LoginPage from './components/LoginPage'
import React from 'react';
import { users } from './dummyUsers';

class App extends React.Component {
  state = {
    currentUser: {}
  }
  
  componentDidMount(){
    this.setState({ currentUser: this.getCurrentUser()});
  }

  getCurrentUser(){
    return users[0];
  }
 
  render(){
    const { currentUser: user } = this.state;
    return (
      <BrowserRouter>
        <Header user={user}/>
        <Route exact path="/signup">
          <h1>
            This is the sign Up Page!
          </h1>
        </Route>
        <Route exact path="/accountverification">
          <AccountVerification user={user}/>
        </Route>
        <Route path="/memberinfo">
          <MemberDashboard user={user}/>
        </Route>
        <Route path="/" exact>
          <LandingPage user={user}/>
        </Route>
        <Route path="/raffles">
          <GridView user={user}/>
        </Route>
        <Route path="/raffle/:id" render={props => <DetailedView user={user} {...props} />} />
      </BrowserRouter>
    );
  }
}

export default App;