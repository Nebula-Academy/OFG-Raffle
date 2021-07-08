import './Header.css';
import React from 'react';
import { signOut } from '../amplifyAuth/amplifyAuth';
import { getTable } from './NetworkRequests';
import { Link } from 'react-router-dom';
import { getTokenFromStorage } from './utils';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component {
    state = {
        collapsed: true
    }

    collapseButtonClick = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }
    
    render() {
        return (
            <header id="ht-masthead" className="ht-site-header">
                <h1>
                    <a>
                        OUR FUTURE GENERATION
                    </a>
                </h1>
                <button onClick={() => getTable('raffle', getTokenFromStorage())}>(BUTTON FOR DEV) Get Table</button>
                <button onClick={signOut}>(BUTTON FOR DEV) SIGN OUT</button>
                <nav>
                    <ul className={this.state.collapsed ? '' : 'opened'}>
                        <Link to='/raffles' onClick={this.collapseButtonClick}>
                            <li>RAFFLES</li>
                        </Link>
                        <Link to='/' onClick={this.collapseButtonClick}>
                            <li>HOME</li>
                        </Link>
                        { this.props.loggedIn ?
                        <Link to='myprofile' onClick={this.collapseButtonClick}>
                            <li>MY-Profile</li>
                        </Link> : null}
                        <Link to='/signup' onClick={this.collapseButtonClick}>
                            <li>SIGN-IN</li>
                        </Link>
                        <Link to='/signup' onClick={this.collapseButtonClick}>
                            <li>SIGN-UP</li>
                        </Link>
                    </ul>
                    <button id='nav-bar-collapse-button' onClick={this.collapseButtonClick}>
                        <MenuIcon />
                    </button>

                </nav>
            </header>
        )
    }
}
export default Header;