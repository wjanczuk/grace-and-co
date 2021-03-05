import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {editQuantity, getOrder, removeItem} from '../store/order'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
    await this.props.getOrder(this.props.user.id)
  }

  render() {
    const {userId, orderItems} = this.props

    return (
      <div>
        {userId === undefined ? (
          <h1>Cart Loading...</h1>
        ) : (
          orderItems.map(item => (
            <div key={item.id}>
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{width: '275px'}}
              />
              <h1>{item.name}</h1>
              <span>QTY: {item.orderItem.quantity}</span>
              <button
                onClick={() =>
                  this.props.editQuantity(++item.orderItem.quantity)
                }
                type="submit"
              >
                +
              </button>
              <button
                onClick={() =>
                  this.props.editQuantity(--item.orderItem.quantity)
                }
                type="submit"
              >
                -
              </button>
              <button
                onClick={() => this.props.removeItem(item.orderItem.id)}
                type="submit"
              >
                Remove
              </button>
            </div>
          ))
        )}

        {/* { (userId && !orderItems.length) &&
            <h1>Your Cart Is Empty</h1>
        } */}
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapping state...')
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
