import './MemberDashboard.css';
import React from 'react';

class MemberDashboard extends React.Component {
    render() {
        return (
            <header id="ht-masthead" class="ht-site-header">
                <h1>
                    <a>
                        Member Profile Page
                    </a>
                </h1>
                <nav>
                    <div>
                        <button className='membutton' onClick={this.firstName}>First_Name</button>
                        <button className='membutton' onClick={this.lastName}>Last_Name</button>
                        <button className='membutton' onClick={this.phone}>Phone</button>
                        <button className='membutton' onClick={this.email}>Email</button>
                        <button className='membutton' onClick={this.address1}>Address_1</button>
                        <button className='membutton' onClick={this.address2}>Address_2</button>
                        <button className='membutton' onClick={this.city}>City</button>
                        <button className='membutton' onClick={this.state}>State</button>
                    </div>
                </nav>
            </header>
        )
    }
}
export default MemberDashboard;