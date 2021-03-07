import React from 'react'
import {connect} from 'react-redux'
import {editQuantity, getOrder, removeItem} from '../store/order'

class Cart extends React.Component {
  constructor() {
    super()
    this.handleClickMinus = this.handleClickMinus.bind(this)
    this.handleClickPlus = this.handleClickPlus.bind(this)
  }

  async componentDidMount() {
    if (this.props.user.id) {
      await this.props.getOrder(this.props.user.id)
    }
  }

  handleClickPlus(id, quantity) {
    quantity++
    const itemObj = {id, quantity}
    this.props.editQuantity(itemObj)
  }

  handleClickMinus(id, quantity) {
    quantity--
    const itemObj = {id, quantity}
    this.props.editQuantity(itemObj)
  }

  render() {
    const {userId, orderItems} = this.props
    console.log(orderItems)

    let displayMessage

    if (userId === undefined) {
      displayMessage = true
    }

    return (
      <div>
        {displayMessage ? (
          <h1>Cart Loading...</h1>
        ) : (
          [
            userId && orderItems.length ? (
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
                      this.handleClickPlus(
                        item.orderItem.id,
                        item.orderItem.quantity
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
                        item.orderItem.quantity
                      )
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
            ) : (
              <h1>Your Cart Is Empty</h1>
            )
          ]
        )}
      </div>
    )
  }
}

const mapState = state => {
  console.log('mapping to state -->', state)
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
