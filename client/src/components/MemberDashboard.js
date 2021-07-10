import './MemberDashboard.css';
import React from 'react';
import Modal from '@material-ui/core/Modal'
import AdminControl from './admin/AdminControl';
import RaffleSummary from './raffles/RaffleSummary';


class MemberDashboard extends React.Component {

    state = {
        adminControl: false
    }

    openAdminControl = () => {
        this.setState({ adminControl: true })
    }

    closeAdminControl = () => {
        this.setState({ adminControl: false })
    }

    render() {
        return (
            <div className='member-dashboard-container'>
                <h1>

                    Member Profile Page

                </h1>
                <div className='member-dashboard'>
                    <form>
                        <label>First_Name
                            <input className='membutton' />
                        </label>
                        <label>Last_Name
                            <input className='membutton'/>
                        </label>
                        <label>Phone
                            <input className='membutton'  />
                        </label>
                        <label>Email
                            <input className='membutton'  />
                        </label>
                        <label>Address1
                            <input className='membutton' />
                        </label>
                        <label>Address2
                            <input className='membutton' />
                        </label>
                        <label>City
                            <input className='membutton' />
                        </label>
                        <label>State
                            <input className='membutton'  />
                        </label>

                    </form>
                </div>
                <div className='raf-bio'>
                    <h2>RAFFLES</h2>              
                   <RaffleSummary />

                </div>
                <Modal
                    className='modal'
                    open={this.state.adminControl}
                    onClose={this.closeAdminControl}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <AdminControl close={this.closeAdminControl}/>
                </Modal>
                { this.props.user.is_admin && <button onClick={this.openAdminControl}>Admin Control</button> }
            </div >

        )
    }
}
export default MemberDashboard;