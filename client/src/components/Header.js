import './Header.css';
import React from 'react';
import { signOut } from '../amplifyAuth/amplifyAuth';

class Header extends React.Component {
    render() {
        return (
            <header id="ht-masthead" className="ht-site-heder">
                <h1>
                    <a>
                        OUR FUTURE GENERATION
                    </a>
                </h1>
                <button onClick={signOut}>(BUTTON FOR DEV) SIGN OUT</button>
                <nav>
                    <ul>
                        <li onClick={this.raffle}>RAFFLE</li>
                        <li onClick={this.home}>HOME</li>
                        <li onClick={this.about}>ABOUT</li>
                        <li onClick={this.gallery}>GALLERY</li>
                        <li onClick={this.scholarships}>SCHOLARSHIPS</li>

                    </ul>

                </nav>
            </header>
        )
    }
}
export default Header;