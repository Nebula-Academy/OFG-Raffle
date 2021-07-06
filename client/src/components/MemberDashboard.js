import './MemberDashboard.css';
import React from 'react';
import RaffleSummary from './RaffleSummary';

class MemberDashboard extends React.Component {
    render() {
        return (
            <div className='member-dashboard-container'>
                <h1>

                    Member Profile Page

                </h1>
                <div className='member-dashboard'>
                    <form>
                        <label>First Name
                            <input className='membutton' onClick={this.firstName} />
                        </label>
                        <label>Last Name
                            <input className='membutton' onclick={this.lastName} />
                        </label>
                        <label>Phone
                            <input className='membutton' onClick={this.phone} />
                        </label>
                        <label>Email
                            <input className='membutton' onClick={this.email} />
                        </label>
                        <label>Address
                            <input className='membutton' onClick={this.address1} />
                        </label>
                        <label>Address(cont)
                            <input className='membutton' onClick={this.address2} />
                        </label>
                        <label>City
                            <input className='membutton' onClick={this.city} />
                        </label>
                        <label>State
                            <input className='membutton' onClick={this.state} />
                        </label>

                    </form>
                </div>
                <div className='raf-bio'>
                    <h2>RAFFLES</h2>              
                   <RaffleSummary />

                </div>
            </div >

        )
    }
}
export default MemberDashboard;