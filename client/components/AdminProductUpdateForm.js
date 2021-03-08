import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/products'

class AdminProductUpdateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = props.product
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
    this.props.updateProduct(this.props.productId, this.state)
  }

  render() {
    return (
      <div>
        <h3>Update Product</h3>
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
    updateProduct: (productId, update) =>
      dispatch(updateProduct(productId, update))
  }
}

export default connect(null, mapDispatch)(AdminProductUpdateForm)
