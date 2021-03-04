import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editQuantity, getOrder, removeItem} from '../store/order'

class Cart extends React.Component {
  componentDidMount() {
    console.log('user in componentDidMount-->', this.props.userId)
    this.props.getOrder(this.props.userId)
  }

  render() {
    return (
      <div>
        {this.props.userId === undefined ? (
          <h1>Product Loading...</h1>
        ) : !this.props.orderItems.length ? (
          <h2>Your Cart Is Empty</h2>
        ) : (
          this.props.orderItems.map(item => (
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
          ))
        )}
      </div>
    )
  }
}

const mapState = state => ({
  orderItems: state.order.items,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  removeItem: itemId => dispatch(removeItem(itemId)),
  getOrder: userId => dispatch(getOrder(userId)),
  editQuantity: quantity => dispatch(editQuantity(quantity))
})

export default connect(mapState, mapDispatch)(Cart)
