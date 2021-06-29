import './MemberDashboard.css';
import React from 'react';

class MemberDashboard extends React.Component {
    render() {
        return (
            <div>
                <h1>
                    <a>
                        Member Profile Page
                    </a>
                </h1>
                <nav>
                    <div className='memberdashboard'>
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
                </nav>
            </div >
            
        )
    }
}
export default MemberDashboard;