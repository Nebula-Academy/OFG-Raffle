import React from 'react'
import './AdminControl.css'
import { updateTable, getTable } from './NetworkRequests'



class AdminControl extends React.Component {
    state = {
        members: []
    }

    componentDidMount = async () =>{
        this.refresh()
    }

    refresh = async () => {
        const holdResponse = await getTable('member')
        console.log(holdResponse)
        this.setState({ members: holdResponse })
    }

    onClickPromoteStatus = async (member) => {
        const holdResponse = await updateTable('member', member.member_id, { is_admin: true})
        this.refresh()
    }

    onClickDemoteStatus = async (member) => {
        const holdResponse = await updateTable('member', member.member_id, { is_admin: false})
        this.refresh()
    }

    
    render() {
        return (
            <div>
                {console.log(this.state.members)}
                <button onClick={this.props.close}>X</button>
                <ul>
                    {this.state.members.map(member => <div key={member.member_id}><li>{member.first_name} {member.last_name} {member.is_admin} {member.email}
                       {! member.is_admin ? <button onClick={() => this.onClickPromoteStatus(member)}>👑</button> :
                        <button onClick={() => this.onClickDemoteStatus(member)}>❌</button>}
                    </li></div>)}
                </ul>
            </div>
        )
    }
}

export default AdminControl