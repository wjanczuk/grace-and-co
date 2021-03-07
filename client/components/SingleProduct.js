import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {addToGuestCart} from '../store/guestCart'

//api/products/:id
//dispatches to redux for single product data

class SingleProduct extends Component {
  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id)
    this.handleAddToCart = this.handleAddToCart.bind(this)
  }

  handleAddToCart(id) {
    if (!this.props.userId) {
      if (!localStorage.getItem('cart')) {
        const emptyCart = {
          items: []
        }
        localStorage.setItem('cart', JSON.stringify(emptyCart)) // create cart for guest user
      }
      addToGuestCart(id)
    }
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
              <h3>This item currently out of stock</h3>
            )}
            <p>{singleProduct.description}</p>

            <button
              disabled={!singleProduct.inventory > 0}
              type="submit"
              onClick={() => this.handleAddToCart(singleProduct.id)}
            >
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
    singleProduct: state.products.selected,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
