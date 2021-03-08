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
          <br />
          <label>Price:</label>
          <input
            type="text"
            name="price"
            onChange={this.handleChange}
            value={this.state.price}
          />
          <br />
          <label>Category:</label>
          <input
            type="text"
            name="category"
            onChange={this.handleChange}
            value={this.state.category}
          />
          <br />
          <label>Inventory:</label>
          <input
            type="text"
            name="inventory"
            onChange={this.handleChange}
            value={this.state.inventory}
          />
          <br />
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            onChange={this.handleChange}
            value={this.state.imageUrl}
          />
          <br />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            onChange={this.handleChange}
            value={this.state.description}
          />
          <br />
          <input type="submit" />
          <br />
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
