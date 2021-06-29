import './App.css';
import Header from './components/Header'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import AccountVerification from './components/AccountVerification'
import TicketBar from './components/TicketBar'
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/AccountVerification">
        <h1>
          This is the sign Up Page!
        </h1>
      </Route>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/AccountVerification/verify" exact>
        <AccountVerification />
      </Route>
      <Route path='/TicketBar/' exact>
      <TicketBar tickets_sold={90} total_tickets={100}/>
      </Route>
    </BrowserRouter>

  );
}

export default App;
