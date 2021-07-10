import './Header.css';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

class Header extends React.Component {
    state = {
        collapsed: true
    }

    collapseButtonClick = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        const { signedIn, signOutSwitch } = this.props;
        return (
            <header id="ht-masthead" className="ht-site-header">
                <h1>
                    <a>
                        OUR FUTURE GENERATION
                    </a>
                </h1>
                <nav>
                    <ul className={this.state.collapsed ? '' : 'opened'}>
                        <Link to='/raffles' onClick={this.collapseButtonClick}>
                            <li>RAFFLES</li>
                        </Link>
                        <Link to='/' onClick={this.collapseButtonClick}>
                            <li>HOME</li>
                        </Link>
                        { signedIn ?
                        <Link to='/myprofile' onClick={this.collapseButtonClick}>
                            <li>MY-PROFILE</li>
                        </Link> : null }
                        
                        { signedIn ? <Link to='/'><li onClick={signOutSwitch}>SIGN-OUT</li></Link> :
                        <Link to='/signup' onClick={this.collapseButtonClick}>
                            <li>SIGN-IN</li>
                        </Link>    
                        }
                        
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