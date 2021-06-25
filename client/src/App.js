import './App.css';
import Header from './components/Header'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import DetailedView from './components/DetailedView';
import GridView from './components/GridView';
import LandingPage from './components/LandingPage'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Route path="/signup">
        <h1>
          This is the sign Up Page!
        </h1>
      </Route>
      <Route path="/" exact>
        <LandingPage />
      </Route>
      <Route path="/raffles">
         <GridView/>
      </Route>
      <Route path="/raffle/:id" component={DetailedView} />
    </BrowserRouter>
  );
}

export default App;