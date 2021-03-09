import React, {Component} from 'react'
import {connect} from 'react-redux'
import {addToGuestCart} from '../store/guestCart'
import {createOrGetOrder, createOrderItem, editQuantity} from '../store/order'

class SingleProductForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
      added: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleAddCart = this.handleAddCart.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: parseInt(event.target.value, 10)
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.handleAddCart(this.props.singleProduct.id, this.state.quantity)
  }

  async handleAddCart(singleProductId) {
    if (!this.props.userId) {
      if (!localStorage.getItem('cart')) {
        const emptyCart = {
          items: [],
          subtotal: 0
        }
        localStorage.setItem('cart', JSON.stringify(emptyCart)) // create cart for guest user
      }
      addToGuestCart(singleProductId, this.state.quantity)
    } else {
      await this.props.createOrGetOrder()
      let {singleProduct, orderItems} = this.props
      let selectedItem
      orderItems = orderItems.map(item => {
        if (item.id === singleProduct.id) {
          selectedItem = item
        }
        return item
      })

      if (selectedItem) {
        selectedItem.orderItem.quantity += this.state.quantity
        this.props.editQuantity(selectedItem.orderItem)
      } else {
        this.props.createOrderItem(singleProduct, this.state.quantity)
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
      <div>
        <form id="qty-select-form" onSubmit={this.handleSubmit}>
          <label>
            Select Quantity:
            <select
              name="quantity"
              value={this.state.quantity}
              onChange={this.handleChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>

          <button
            disabled={!singleProduct.inventory > 0}
            type="submit"
            value="Submit"
          >
            Add To Cart
          </button>
        </form>
        <br />
        {this.state.added ? <span>Added to cart!</span> : ''}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    orderItems: state.order.items,
    userId: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createOrGetOrder: () => dispatch(createOrGetOrder()),
    createOrderItem: (product, qty) => dispatch(createOrderItem(product, qty)),
    editQuantity: itemObj => dispatch(editQuantity(itemObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProductForm)

{
  /* {this.state.quantity ==='5+'
          ?<input name="quantity" type="text" value={this.state.quantity} onChange={this.handleChange} />
          : */
}
