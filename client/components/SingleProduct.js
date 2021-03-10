import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'

import SingleProductForm from './SingleProductForm' //add to component index

class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id)
  }

  render() {
    const {singleProduct} = this.props

    return (
      <div id="single-product-container">
        {singleProduct === undefined ? (
          <h4>Product Loading...</h4>
        ) : (
          <div>
            <img
              src={singleProduct.imageUrl}
              alt={singleProduct.name}
              className="image left"
            />
            <h3>{singleProduct.name}</h3>
            <h3>
              ${singleProduct.price ? singleProduct.price.toFixed(2) : ''}
            </h3>
            {singleProduct.inventory === 0 && (
              <h3>This item is currently out of stock :(</h3>
            )}
            <p>{singleProduct.description}</p>
            <SingleProductForm singleProduct={singleProduct} />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products.selected
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
