import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editQuantity, getOrder, removeItem} from '../store/order'

class Cart extends React.Component {
  componentDidMount() {
    this.props.getOrder(this.props.user.id)
  }

  render() {
    return (
      <div>
        {this.props.order.map(item => (
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
  orderItems: state.order.items,
  user: state.user
})

const mapDispatch = dispatch => ({
  removeItem: itemId => dispatch(removeItem(itemId)),
  getOrder: userId => dispatch(getOrder(userId)),
  editQuantity: quantity => dispatch(editQuantity(quantity))
})

export default connect(mapState, mapDispatch)(Cart)
