import React from 'react'
import {connect} from 'react-redux'
import {deleteProduct, getProductsAdmin} from '../store/products'
import AdminProductUpdateForm from './AdminProductUpdateForm'
import AdminAddProductForm from './AdminAddProductForm'

class AdminAllProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      update: false
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.getProductsAdmin()
  }

  handleClick(event) {
    if (event) event.preventDefault()
    this.setState({
      update: !this.state.update
    })
  }

  render() {
    return (
      <div>
        <h2>Inventory</h2>
        <AdminAddProductForm />
        <hr />
        {this.props.products.map(product => (
          <div key={product.id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{width: '175px'}}
              className="image left"
            />
            <span>
              <strong>id:</strong> {product.id}
            </span>
            <br />
            <span>
              <strong>name:</strong> {product.name}
            </span>
            <br />
            <span>
              <strong>category:</strong> {product.category}
            </span>
            <br />
            <span>
              <strong>price:</strong> ${product.price.toFixed(2)}
            </span>
            <br />
            <span>
              <strong>inventory:</strong> {product.inventory}
            </span>
            <br />
            <span>
              <strong>description:</strong> {product.description}
            </span>
            <br />
            <br />
            <span>
              <button
                type="button"
                onClick={() => this.props.deleteProduct(product.id)}
                className="button small"
              >
                Delete
              </button>
            </span>
            <span>
              <button
                type="button"
                onClick={this.handleClick}
                className="button small"
              >
                Update
              </button>
            </span>
            {this.state.update && (
              <AdminProductUpdateForm
                product={product}
                productId={product.id}
                hideUpdateForm={this.handleClick}
              />
            )}
            <hr />
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products.all
  }
}

const mapDispatch = dispatch => {
  return {
    getProductsAdmin: () => dispatch(getProductsAdmin()),
    deleteProduct: productId => dispatch(deleteProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(AdminAllProduct)
