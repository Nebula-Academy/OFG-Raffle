import React from 'react'
import './EditCategories.css'
import { addTable, getTable, deleteTableById, updateTable } from '../NetworkRequests'

class EditCategories extends React.Component {

    state = {
        categories: [],
        displayedCategory: [],
        selectedCategory: "",
        currentUpdate: null
    }

    componentDidMount = async () => {
        this.refresh()
    }

    refresh = async () => {
        const holdResponse = await getTable('category')
        this.props.updateCategories(holdResponse)
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onClickAdd = async () => {
        await addTable('category', { category_name: this.state.inputCat })
        this.refresh()
    }

    onClickDelete = async (id) => {
        await deleteTableById('category', id)
        this.refresh()
    }

    onClickUpdate = async (id) => {
        await updateTable('category', id, { category_name: this.state.updateCat })
        this.refresh()
    }

    toggleUpdate(id) {
        this.setState({ currentUpdate: id })
    }


    render() {
        return (
            <div>
                <button className='closeButton' onClick={this.props.close}>X</button>
                <ul className="editCategories">
                    {this.props.categories.map(category => <div className='['><li className='categories'>{category.category_name}
                        <button onClick={() => this.onClickDelete(category.category_id)}>Delete</button>
                        <button onClick={() => this.toggleUpdate(category.category_id)}>Edit</button>
                        {this.state.currentUpdate == category.category_id && <div>
                            <input name='updateCat' onChange={this.handleChange}></input>
                            <button onClick={() => this.onClickUpdate(category.category_id)}>✏️</button>
                        </div>}
                    </li></div>)}
                </ul>
                <input name='inputCat' onChange={this.handleChange}></input>
                <button onClick={this.onClickAdd}>+</button>
            </div>
        )
    }
}

export default EditCategories