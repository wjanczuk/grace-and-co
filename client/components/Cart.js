import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editQuantity, getItems, removeItem} from '../store/cartItem'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getCartItems(this.props.cartId)
  }

  render() {
    return (
      <div>
        {this.props.cartItems.map(item => (
          <div key={item.id}>
            <img src={item.imageUrl} alt={item.name} />
            <h1>{item.name}</h1>
            <span>{item.quantity}</span>
            <button
              onClick={() => this.props.editQuantity(++item.quantity)}
              type="submit"
            >
              +
            </button>
            <button
              onClick={() => this.props.editQuantity(--item.quantity)}
              type="submit"
            >
              -
            </button>
            <button
              onClick={() => this.props.removeItem(item.id)}
              type="submit"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  cartItems: state.cartItems
})

const mapDispatch = dispatch => ({
  removeItem: itemId => dispatch(removeItem(itemId)),
  getCartItems: cartId => dispatch(getItems(cartId)),
  editQuantity: quantity => dispatch(editQuantity(quantity))
})

connect(mapState, mapDispatch)(Cart)
