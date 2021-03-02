import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getProducts} from '../store/products'

class AllProduct extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }
  render() {
    return (
      <div>
        <div>
          <h3> Grace Shopper </h3>
          <h5>Quote insert</h5>
        </div>
        {this.props.products.map(product => (
          <div key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.imageUrl} alt={product.name} />
              <h5>{product.name}</h5>
              <span>{product.price}</span>
              <span>{product.quantity}</span>
            </Link>
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
    //make sure getProducts is imported with correct file path
    getProducts: () => dispatch(getProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProduct)
