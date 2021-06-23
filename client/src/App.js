import './App.css';
import Header from './components/Header'
import { BrowserRouter, Link, Route } from 'react-router-dom'


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
    </BrowserRouter>

  );
}

export default App;
