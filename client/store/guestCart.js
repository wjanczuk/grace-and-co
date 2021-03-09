import axios from 'axios'

export const addToGuestCart = async (productId, qty) => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`) // grab product
    const productObj = {
      // create productObj to store product and orderItem info and mimic database
      ...product,
      orderItem: {
        quantity: qty,
        id: product.id,
        price: product.price
      }
    }
    let cart = JSON.parse(localStorage.getItem('cart')) // grab guest cart

    let inCart = false
    cart.items = cart.items.map(item => {
      // updates quantity if already in cart
      if (item.id === productObj.id) {
        item.orderItem.quantity += qty
        inCart = true
        cart.subtotal += item.orderItem.price * qty
      }
      return item
    })
    if (!inCart) {
      cart.items.push(productObj) // add to items array
      cart.subtotal += cart.items[cart.items.length - 1].orderItem.price * qty // grabs last index for orderItem price
    }

    localStorage.setItem('cart', JSON.stringify(cart)) // reset guest cart with added product
  } catch (error) {
    console.log(error)
  }
}

export const editGuestQuantity = (id, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart')) // grab guest cart
  cart.items.map(product => {
    // change quantity in cart to specified quantity
    if (product.id === id) {
      if (product.orderItem.quantity < quantity) {
        cart.subtotal += product.orderItem.price
      } else {
        cart.subtotal -= product.orderItem.price
      }
      product.orderItem.quantity = quantity
    }
    return product
  })
  localStorage.setItem('cart', JSON.stringify(cart)) // reset guest cart with new quantity
  return JSON.parse(localStorage.getItem('cart')) // returns cart
}

export const removeGuestItem = productId => {
  const cart = JSON.parse(localStorage.getItem('cart')) // grab guest cart
  cart.items = cart.items.filter(product => {
    // filter out deleted product
    if (product.id === productId) {
      cart.subtotal -= product.orderItem.quantity * product.orderItem.price
      return false
    }
    return true
  })
  localStorage.setItem('cart', JSON.stringify(cart)) // reset guest cart
  return JSON.parse(localStorage.getItem('cart')) // return cart
}

export const guestCheckout = async orderObj => {
  try {
    const {data: order} = await axios.post('/api/cart', orderObj) // creates a user and order for guest
    orderObj.products = orderObj.products.map(product => ({
      // adds needed keys to orderObj to create orderItems
      productId: product.id,
      orderId: order.id,
      quantity: product.orderItem.quantity,
      price: product.orderItem.price
    }))
    const {data: completedOrder} = await axios.post(
      `/api/cart/items/${order.id}`,
      orderObj
    ) // bulk creates orderItems for the database and changes order status to completed
    localStorage.removeItem('cart') // deletes cart from guest browser
    return completedOrder
  } catch (error) {
    console.log(error)
  }
}
