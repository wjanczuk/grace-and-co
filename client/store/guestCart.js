import axios from 'axios'

export const addToGuestCart = async productId => {
  try {
    const {data: product} = await axios.get(`/api/products/${productId}`) // grab product
    const productObj = {
      // create productObj to store product and orderItem info
      ...product,
      orderItem: {
        quantity: 1,
        id: product.id
      }
    }
    let cart = JSON.parse(localStorage.getItem('cart')) // grab guest cart
    let inCart = false
    cart.items = cart.items.map(item => {
      if (item.id === productObj.id) {
        item.orderItem.quantity++
        inCart = true
      }
      return item
    })
    if (!inCart) {
      cart.items.push(productObj) // add to items array
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
      product.orderItem.quantity = quantity
    }
    return product
  })
  localStorage.setItem('cart', JSON.stringify(cart)) // reset guest cart with new quantity
  return JSON.parse(localStorage.getItem('cart')).items // returns cart items
}

export const removeGuestItem = productId => {
  const cart = JSON.parse(localStorage.getItem('cart')) // grab guest cart
  cart.items = cart.items.filter(product => product.id !== productId) // filter out deleted product
  localStorage.setItem('cart', JSON.stringify(cart)) // reset guest cart
  return JSON.parse(localStorage.getItem('cart')).items // return cart items
}

export const guestCheckout = async orderObj => {
  try {
    const {data: order} = await axios.post('/api/cart', orderObj) // creates a user and order for guest
    orderObj.products = orderObj.products.map(product => ({
      // adds needed keys to orderObj to create orderItems
      productId: product.id,
      orderId: order.id,
      quantity: product.orderItem.quantity,
      price: product.price
    }))
    const {data: completedOrder} = await axios.post('/api/cart/items', orderObj) // bulk creates orderItems for the database and changes order status to completed
    localStorage.removeItem('cart') // deletes cart from guest browser
    return completedOrder
  } catch (error) {
    console.log(error)
  }
}

export const removeGuestCart = () => {
  localStorage.removeItem('cart')
}
