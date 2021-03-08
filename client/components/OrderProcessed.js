import React from 'react'
import {Link} from 'react-router-dom'

const OrderProcessed = () => {
  return (
    <div>
      <h1>Your order is processed! </h1>
      <Link to="/products">
        <span>Continue Shopping</span>
      </Link>
    </div>
  )
}

export default OrderProcessed
