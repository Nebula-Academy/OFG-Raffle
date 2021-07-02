import './App.css';
import Header from './components/Header'
import MemberDashboard from './components/MemberDashboard';
import { BrowserRouter, Link, Route } from 'react-router-dom'
import DetailedView from './components/DetailedView';
import GridView from './components/GridView';
import LandingPage from './components/LandingPage'
import AccountVerification from './components/AccountVerification'
import LoginPage from './components/LoginPage'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/signup">
        <h1>
          This is the sign Up Page!
        </h1>
      </Route>
      <Route exact path="/accountverification">
        <AccountVerification/>
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

export default App;