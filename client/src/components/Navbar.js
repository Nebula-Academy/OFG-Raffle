import './Navbar.css';
import React from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import * as store from './store';

class Navbar extends React.Component {
    state = {
        collapsed: true,
        headerMenu: null
    }
    componentDidMount() {
        store.set('header-menu', <></>);
        store.subscribe('header-menu', headerMenu => this.setState({ headerMenu }));
    }
    collapseButtonClick = () => {
        this.setState({ collapsed: !this.state.collapsed })
    }

    render() {
        const { signedIn, signOutSwitch } = this.props;
        return (
            <div className='main-navbar'>
                <header id="ht-masthead" className="ht-site-header">
                    <h1>
                        <Link to='/'>
                            OUR FUTURE GENERATION
                        </Link>
                    </h1>
                    <nav>
                        <ul className={this.state.collapsed ? '' : 'opened'}>
                            <Link to='/' onClick={this.collapseButtonClick}>
                                <li>HOME</li>
                            </Link>
                            <Link to='/raffles' onClick={this.collapseButtonClick}>
                                <li>RAFFLES</li>
                            </Link>
                            {signedIn ?
                                <Link to='/profile' onClick={this.collapseButtonClick}>
                                    <li>MY PROFILE</li>
                                </Link> : null}

                            {signedIn ? <Link to='/'><li onClick={signOutSwitch}>SIGN-OUT</li></Link> :
                                <Link to='/signup' onClick={this.collapseButtonClick}>
                                    <li>SIGN-IN</li>
                                </Link>
                            }

                            {!signedIn && <Link to='/signup' onClick={this.collapseButtonClick}>
                                <li>SIGN-UP</li>
                            </Link>}
                        </ul>
                        <button id='nav-bar-collapse-button' onClick={this.collapseButtonClick}>
                            <MenuIcon />
                        </button>

                    </nav>
                </header>
                {this.state.headerMenu && <div className='subheader-menu'>
                    {this.state.headerMenu}
                </div>}
            </div>
        )
    }
}
export default Navbar;