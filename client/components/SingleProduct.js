import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'

//api/products/:id
//dispatches to redux for single product data

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
            <img src={singleProduct.imageUrl} alt={singleProduct.name} />
            <h1>{singleProduct.name}</h1>
            <h3>${singleProduct.price}</h3>
            {singleProduct.inventory === 0 && (
              <h3>This item currently out of stock</h3>
            )}
            <p>{singleProduct.description}</p>

            <button disabled={!singleProduct.inventory > 0} type="submit">
              Add To Cart
            </button>
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
