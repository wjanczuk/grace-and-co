import React, {Component} from 'react'
import {connect} from 'react-redux'
// import { Link } from 'react-router-dom'
// import {fetchProduct} from ''

//api/products/:id
//dispatches to redux for single product data

class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    return (
      <div id="single-product-container">
        {product ? (
          <h1>Product Loading...</h1>
        ) : (
          <div>
            <img src={product.imageUrl} alt={product.name} />
            <h1>{product.name}</h1>
            <h3>{product.price}</h3>
            {product.inventory === 0 && (
              <h3>This item currently out of stock</h3>
            )}
            <p>{product.description}</p>

            <button disabled={!product.inventory > 0} type="submit">
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
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadProduct: id => dispatch(fetchProduct(id)) //add in redux
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
