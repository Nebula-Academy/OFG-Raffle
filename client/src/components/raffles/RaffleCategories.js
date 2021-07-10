import React from 'react' 

class RaffleCategories extends React.Component{
    constructor(props){
        super(props);
    }

    state = {
        displayedCategory: [],
        selectedCategory: ""
    }

    dropDownMenu = (e) => {
        this.setState({ selectedCategory: e.target.value})
        this.props.refresh(e.target.value)
        if(e.target.value == 'all categories'){
            this.props.refresh()
        }
    }

    render(){
        return(
            <div>
                {this.props.categories.length > 0 && <select onChange={this.dropDownMenu} value={this.state.selectedCategory}>
                <option disabled value=''>Categories</option>
                <option value='all categories'>All</option>
                {this.props.categories.map(category => <option key={category.category_id} value={category.category_id}>{category.category_name}</option>)}
                </select>}
            </div>
        )
    }
}

export default RaffleCategories;