import './MemberDashboard.css';
import React from 'react';

class MemberDashboard extends React.Component {
    render() {
        return (
            <div className='member-dashboard-container'>
                <h1>

                    Member Profile Page

                </h1>
                <div className='member-dashboard'>
                    <form>
                        <label>First_Name
                            <input className='membutton' onClick={this.firstName} />
                        </label>
                        <label>Last_Name
                            <input className='membutton' onclick={this.lastName} />
                        </label>
                        <label>Phone
                            <input className='membutton' onClick={this.phone} />
                        </label>
                        <label>Email
                            <input className='membutton' onClick={this.email} />
                        </label>
                        <label>Address1
                            <input className='membutton' onClick={this.address1} />
                        </label>
                        <label>Address2
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
                    <h2>RAFFLE</h2>
                    <div>
                        <label>RAFFLE TITLE
                            <input className='rafbutton' onclick={this.raftitle} />
                        </label>
                        <label>RAFFLE DESCRIPTION
                            <input className='rafbutton' onclick={this.rafdescription} />
                        </label>
                        <label>TOTAL TICKETS
                            <input className='rafbutton' onclick={this.total} />
                        </label>
                        <label>TICKET PRICE
                            <input className='rafbutton' onclick={this.price} />
                        </label>
                        <label>TICKETS SOLD
                            <input className='rafbutton' onclick={this.sold} />
                        </label>
                    </div>

                </div>
            </div >

        )
    }
}
export default MemberDashboard;