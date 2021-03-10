import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/products'

class AdminAddProductForm extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      category: '',
      inventory: '',
      imageUrl: '',
      description: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addProduct(this.state)
    this.setState({
      name: '',
      price: '',
      category: '',
      inventory: '',
      imageUrl: '',
      description: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Add Product</h3>
        <form onSubmit={this.handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            onChange={this.handleChange}
            value={this.state.price}
          />
          <label>Category:</label>
          <select
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          >
            <option value="Beaded">Beaded</option>
            <option value="Brass">Brass</option>
            <option value="Lucite + Resin">Lucite + Resin</option>
            <option value="Wood">Wood</option>
            <option value="Leather">Leather</option>
            <option value="Huggies + Ear Cuffs">Huggies + Ear Cuffs</option>
            <option value="Stud">Stud</option>
            <option value="Statement">Statement</option>
          </select>
          <label>Inventory:</label>
          <input
            type="text"
            name="inventory"
            onChange={this.handleChange}
            value={this.state.inventory}
          />
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <input type="submit" onClick={this.props.handleClick} />
        </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addProduct: newProduct => dispatch(addProduct(newProduct))
  }
}

export default connect(null, mapDispatch)(AdminAddProductForm)
