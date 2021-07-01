import React from 'react'
import './EditCategories.css'
import { getTable } from './NetworkRequests'

class EditCategories extends React.Component {

    state = {
        categories: [],
        displayedCategory: [],
        selectedCategory: ""
    }

    componentDidMount = async () => {
        const holdResponse = await getTable('category')
        console.log(holdResponse)
        this.setState({categories: holdResponse})
    }

    render() {
        return (
            <div>
                <button className='closeButton' onClick={this.props.close}>X</button>
                <ul className="editCategories">
                   {this.state.categories.map(category => <div><li>{category.category_name}<button>✏️</button></li></div>)}
                </ul>
                <button>+</button>
            </div>
        )
    }
}

export default EditCategories