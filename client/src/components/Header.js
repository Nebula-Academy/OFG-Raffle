import './Header.css';
import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header id="ht-masthead" class="ht-site-heder">
                <h1>
                    <a>
                        OUR FUTURE GENERATION
                    </a>
                </h1>
                <nav>
                    <ul>
                        <li onClick={this.raffle}>RAFFLE</li>
                        <li onClick={this.home}>HOME</li>
                        <li onClick={this.signIn}>SIGN-IN</li>
                        <li onClick={this.signUp}>SIGN-UP</li>
                        

                    </ul>

                </nav>
            </header>
        )
    }
}
export default Header;