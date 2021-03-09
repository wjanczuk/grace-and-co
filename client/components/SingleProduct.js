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
          <h1>Product Loading...</h1>
        ) : (
          <div>
            <img
              src={singleProduct.imageUrl}
              alt={singleProduct.name}
              style={{width: '275px'}}
            />
            <h1>{singleProduct.name}</h1>
            <h3>${singleProduct.price}</h3>
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
