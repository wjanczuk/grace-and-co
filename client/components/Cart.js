import React from 'react'
import {connect} from 'react-redux'
import {editQuantity, getOrder, removeItem, completeOrder} from '../store/order'
import {
  editGuestQuantity,
  removeGuestItem,
  guestCheckout
} from '../store/guestCart'
import {Redirect} from 'react-router-dom'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: {
        items: []
      },
      displayCheckout: false,
      displayOrderSuccess: false,
      email: ''
    }
    this.handleClickMinus = this.handleClickMinus.bind(this)
    this.handleClickPlus = this.handleClickPlus.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
    this.startCheckout = this.startCheckout.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    if (this.props.user.id) {
      // if user exists, grab cart from store
      await this.props.getOrder(this.props.user.id)
    } else if (localStorage.getItem('cart')) {
      // if cart exists in localstorage grab cart and set to local state
      const localCart = JSON.parse(localStorage.getItem('cart'))
      this.setState({
        cart: localCart
      })
    }
  }

  handleClickPlus(id, quantity, orderId) {
    quantity++
    const itemObj = {id, quantity, orderId}
    if (this.props.user.id) {
      this.props.editQuantity(itemObj)
    } else {
      const localCart = editGuestQuantity(id, quantity)
      this.setState({
        cart: localCart
      })
    }
  }

  handleClickMinus(id, quantity, orderId) {
    quantity--
    const itemObj = {id, quantity, orderId}
    if (this.props.user.id) {
      this.props.editQuantity(itemObj)
    } else {
      const localCart = editGuestQuantity(id, quantity)
      this.setState({
        cart: localCart
      })
    }
  }

  async handleRemove(itemId, productId) {
    if (this.props.user.id) {
      await this.props.removeItem(itemId)
    } else {
      const localCart = removeGuestItem(productId)
      this.setState({
        cart: localCart
      })
    }
  }

  handleCheckout(evt) {
    evt.preventDefault()

    const orderObj = {
      products: this.state.cart.items,
      email: this.state.email
    }

    guestCheckout(orderObj)
    this.setState({
      cart: {
        items: []
      },
      email: '',
      displayOrderSuccess: true
    })
  }

  handleChange(evt) {
    this.setState({
      email: evt.target.value
    })
  }

  startCheckout() {
    if (this.props.userId) {
      this.props.completeOrder(this.props.userId)
      this.setState({
        displayOrderSuccess: true
      })
    }

    this.setState({
      displayCheckout: true
    })
  }
  render() {
    const {displayOrderSuccess} = this.state
    const cart = this.props.user.id ? this.props.order : this.state.cart
    return displayOrderSuccess ? (
      <Redirect to="/complete" />
    ) : (
      <div>
        {// (!this.props.userId && !this.state.cart.length) ? ( // cannot get this to work and also say cart is empty after loading ):
        //     <h1>Cart Loading...</h1>
        //   ) : (
        Object.keys(cart).length &&
          cart.items.map(item => (
            <div key={item.id}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{width: '275px'}}
              />
              <h1>{item.name}</h1>
              <span>QTY: {item.orderItem.quantity}</span>
              <span>
                Total: ${item.orderItem.price * item.orderItem.quantity}
              </span>
              <button
                onClick={() =>
                  this.handleClickPlus(
                    item.orderItem.id,
                    item.orderItem.quantity,
                    item.orderItem.orderId
                  )
                }
                type="submit"
              >
                +
              </button>
              <button
                onClick={() =>
                  this.handleClickMinus(
                    item.orderItem.id,
                    item.orderItem.quantity,
                    item.orderItem.orderId
                  )
                }
                type="submit"
              >
                -
              </button>
              <button
                onClick={() => this.handleRemove(item.orderItem.id, item.id)}
                type="submit"
              >
                Remove
              </button>
            </div>
          ))}

        {cart.items.length ? (
          <div>
            Subtotal: ${cart.subtotal}
            <button type="submit" onClick={() => this.startCheckout()}>
              Checkout
            </button>
          </div>
        ) : (
          <h1>Your Cart Is Empty</h1>
        )}

        {cart.length && (
          <div>
            {/* ADDED DELETE CART BUTTON */}
            <button type="submit" onClick={() => this.deleteCart()}>
              Delete Cart
            </button>
            <button type="submit" onClick={() => this.startCheckout()}>
              Checkout
            </button>
          </div>
        )}

        {this.state.displayCheckout &&
          !this.props.user.id && (
            <form onSubmit={this.handleCheckout}>
              <label htmlFor="email">
                Please enter your email before continuing to checkout:{' '}
              </label>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <button type="submit">Continue</button>
            </form>
          )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    order: state.order,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  removeItem: itemId => dispatch(removeItem(itemId)),
  getOrder: userId => dispatch(getOrder(userId)),
  editQuantity: quantity => dispatch(editQuantity(quantity)),
  completeOrder: userId => dispatch(completeOrder(userId))
})

export default connect(mapState, mapDispatch)(Cart)
