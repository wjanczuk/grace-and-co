import axios from 'axios'

export const addToGuestCart = async productId => {
  const {data: product} = await axios.get(`/api/products/${productId}`)
  const productObj = {
    ...product,
    orderItem: {
      quantity: 1,
      id: product.id
    }
  }
  const cart = JSON.parse(localStorage.getItem('cart'))
  cart.items.push(productObj)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const editGuestQuantity = (id, quantity) => {
  const cart = JSON.parse(localStorage.getItem('cart'))
  cart.items.map(product => {
    if (product.id === id) {
      product.orderItem.quantity = quantity
    }
    return product
  })
  localStorage.setItem('cart', JSON.stringify(cart))
  return JSON.parse(localStorage.getItem('cart')).items
}

export const removeGuestItem = productId => {
  const cart = JSON.parse(localStorage.getItem('cart'))
  cart.items = cart.items.filter(product => product.id !== productId)
  localStorage.setItem('cart', JSON.stringify(cart))
  return JSON.parse(localStorage.getItem('cart')).items
}

export const guestCheckout = async orderObj => {
  try {
    const {data: order} = await axios.post('/api/cart', orderObj)
    orderObj.products = orderObj.products.map(product => ({
      productId: product.id,
      orderId: order.id,
      quantity: product.orderItem.quantity,
      price: product.price
    }))
    const {data: items} = await axios.post('/api/cart/items', orderObj)
    console.log(items)
  } catch (error) {
    console.log('Error')
  }
}
