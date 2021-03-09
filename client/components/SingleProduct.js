import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {addToGuestCart} from '../store/guestCart'
import {createOrGetOrder, createOrderItem, editQuantity} from '../store/order'

class SingleProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      added: false
    }
    this.handleAddCart = this.handleAddCart.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id)
  }

  async handleAddCart() {
    if (!this.props.userId) {
      // for guest user
      if (!localStorage.getItem('cart')) {
        const emptyCart = {
          items: [],
          subtotal: 0
        }
        localStorage.setItem('cart', JSON.stringify(emptyCart)) // create cart for guest user
      }
      addToGuestCart(this.props.singleProduct.id) // adds to localStorage cart
    } else {
      await this.props.createOrGetOrder() // database creates or finds user cart and sets it to state
      let {singleProduct, orderItems} = this.props

      let selectedItem
      orderItems = orderItems.map(product => {
        // checks to see if product is in user cart
        if (product.id === singleProduct.id) {
          selectedItem = product
        }
        return product
      })

      if (selectedItem) {
        selectedItem.orderItem.quantity++
        this.props.editQuantity(selectedItem.orderItem) // adds quantity to existing orderItem
      } else {
        this.props.createOrderItem(singleProduct) // creates new orderItem
      }
    }

    this.setState({
      added: true
    })
    setTimeout(() => {
      this.setState({
        added: false
      })
    }, 1000)
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
              onClick={() => this.handleAddCart(singleProduct.id)}
              type="submit"
            >
              Add To Cart
            </button>
            <br />
            {this.state.added ? <span>Added to cart!</span> : ''}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    singleProduct: state.products.selected,
    orderItems: state.order.items,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSingleProduct: id => dispatch(getSingleProduct(id)),
    createOrGetOrder: () => dispatch(createOrGetOrder()),
    createOrderItem: product => dispatch(createOrderItem(product)),
    editQuantity: itemObj => dispatch(editQuantity(itemObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
