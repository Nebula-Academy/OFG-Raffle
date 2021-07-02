import React from 'react' 
import { getTable, } from './NetworkRequests'

class RaffleCategories extends React.Component{
    constructor(props){
    super(props)
    }

    state = {
        categoryMenu: [],
        displayedCategory: [],
        selectedCategory: ""
    }

    componentDidMount = async () => {
        const holdResponse = await getTable('category')
        this.setState({categoryMenu: holdResponse})
    }

    dropDownMenue = (e) => {
        this.setState({ selectedCategory: e.target.value})
        this.props.refresh(e.target.value)
        if(e.target.value == 'all categories'){
            this.props.refresh()
        }
    }

    render(){
        return(
            <div>
                {this.state.categoryMenu.length > 0 && <select onChange={this.dropDownMenue} value={this.state.selectedCategory}>
                <option disabled value=''>Categories</option>
                <option value='all categories'>All</option>
                {this.state.categoryMenu.map(category => <option key={category.category_id} value={category.category_id}>{category.category_name}</option>)}
                </select>}
            </div>
        )
    }
}

export default RaffleCategories;