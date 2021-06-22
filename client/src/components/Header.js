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
                    <button>RAFFLE</button>
                    <button>HOME</button>
                    <button>About</button>
                    <button>GALLERY</button>
                    <button>SCHOLARSHIPS</button>
                </nav>
            </header>
        )
    }
}
export default Header;