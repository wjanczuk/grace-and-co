import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/products'
import {addToGuestCart} from '../store/guestCart'
import {
  addToOrder,
  createOrder,
  createOrderItem,
  editQuantity
} from '../store/order'

//api/products/:id
//dispatches to redux for single product data

class SingleProduct extends Component {
  constructor(props) {
    super(props)

    this.handleAddCart = this.handleAddCart.bind(this)
  }

  componentDidMount() {
    this.props.loadSingleProduct(this.props.match.params.id)
    // if (this.props.userId) {
    //   this.props.createOrder() //if user logged in, findOrCreate Order/cart
    // }
  }

  handleAddCart(singleProductId) {
    if (!this.props.userId) {
      if (!localStorage.getItem('cart')) {
        const emptyCart = {
          items: []
        }
        localStorage.setItem('cart', JSON.stringify(emptyCart)) // create cart for guest user
      }
      addToGuestCart(singleProductId)
    } else {
      this.props.createOrder()
      let {singleProduct, orderItems} = this.props

      let selectedItem
      orderItems = orderItems.map(item => {
        if (item.id === singleProduct.id) {
          selectedItem = item
        }
        return item
      })

      if (selectedItem) {
        selectedItem.orderItem.quantity++
        this.props.editQuantity(selectedItem.orderItem)
      } else {
        this.props.createOrderItem(singleProduct)
      }
    }
  }

  render() {
    const {singleProduct} = this.props

    console.log(this.props)
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
    addToCart: (productId, qty) => dispatch(addToOrder(productId, qty)),
    createOrder: () => dispatch(createOrder()),
    createOrderItem: product => dispatch(createOrderItem(product)),
    editQuantity: itemObj => dispatch(editQuantity(itemObj))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
