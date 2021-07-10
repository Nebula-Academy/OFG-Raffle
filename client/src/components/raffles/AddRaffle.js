import React from 'react';
import './AddRaffle.css';
import { addTable } from '../NetworkRequests'
const requiredFields = ['title', 'raffle_description','total_tickets','ticket_price', 'item_cost','image_file_path', 'category_id']

class AddRaffle extends React.Component{
    
    state = {}

    titleTranslator(title){
        let newTitle = title.split('_').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')
        
        return newTitle
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClick = async () => {
        let valid = true
        for(let i=0; i<requiredFields.length; i++){
            valid = valid && this.state[requiredFields[i]]
        }
        if(!valid) {
            alert("Please fill all required fields");
            return
        }
        let data = {...this.state, tickets_sold: 0, category_id: 1};
        await addTable('raffle', data)
        this.setState({});
        this.props.refresh();
        this.props.close();
        alert("The raffle was succesfully submitted")
    }

    render(){
        return(
            <div>
            <button className='closeButton' onClick={this.props.close}>X</button>
            <div className='inputs'>
                {requiredFields.map(input => <div className='inputColumn' key={input}>
                    <label>
                        {this.titleTranslator(input)}
                    </label>
                    <input onChange={this.handleChange} name={input} value={this.state[input]}/>
                </div>)}
                <button className='submitButton' onClick={this.onClick}> Submit </button>
            </div>
            </div>
        )
    }
}

export default AddRaffle