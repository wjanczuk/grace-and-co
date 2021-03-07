import React from 'react'
import {connect} from 'react-redux'
import {editQuantity, getOrder, removeItem} from '../store/order'
import {
  editGuestQuantity,
  removeGuestItem,
  guestCheckout
} from '../store/guestCart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      cart: [],
      displayCheckout: false,
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
      await this.props.getOrder(this.props.user.id)
    } else if (localStorage.getItem('cart')) {
      const localCart = JSON.parse(localStorage.getItem('cart')).items
      this.setState({
        cart: localCart
      })
    }
  }

  handleClickPlus(id, quantity) {
    quantity++
    const itemObj = {id, quantity}
    if (this.props.user.id) {
      this.props.editQuantity(itemObj)
    } else {
      const localCart = editGuestQuantity(id, quantity)
      this.setState({
        cart: localCart
      })
    }
  }

  handleClickMinus(id, quantity) {
    quantity--
    const itemObj = {id, quantity}
    if (this.props.user.id) {
      this.props.editQuantity(itemObj)
    } else {
      editGuestQuantity(id, quantity)
      const localCart = JSON.parse(localStorage.getItem('cart')).items
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
      products: this.state.cart,
      email: this.state.email
    }
    guestCheckout(orderObj)
    this.setState({
      cart: []
    })
  }

  handleChange(evt) {
    this.setState({
      email: evt.target.value
    })
  }

  startCheckout() {
    this.setState({
      displayCheckout: true
    })
  }
  render() {
    const cart = this.props.user.id ? this.props.orderItems : this.state.cart

    return (
      <div>
        {// (!this.props.userId && !this.state.cart.length) ? ( // cannot get this to work and also say cart is empty after loading ):
        //     <h1>Cart Loading...</h1>
        //   ) : (
        cart.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} alt={item.name} style={{width: '275px'}} />
            <h1>{item.name}</h1>
            <span>QTY: {item.orderItem.quantity}</span>
            <button
              onClick={() =>
                this.handleClickPlus(item.orderItem.id, item.orderItem.quantity)
              }
              type="submit"
            >
              +
            </button>
            <button
              onClick={() =>
                this.handleClickMinus(
                  item.orderItem.id,
                  item.orderItem.quantity
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

        {!cart.length && <h1>Your Cart Is Empty</h1>}
        {cart.length && (
          <button type="submit" onClick={() => this.startCheckout()}>
            Checkout
          </button>
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
    orderItems: state.order.items,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => ({
  removeItem: itemId => dispatch(removeItem(itemId)),
  getOrder: userId => dispatch(getOrder(userId)),
  editQuantity: quantity => dispatch(editQuantity(quantity))
})

export default connect(mapState, mapDispatch)(Cart)
