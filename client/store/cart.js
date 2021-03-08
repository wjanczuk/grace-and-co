import axios from 'axios'

//ACTION TYPES
const GOT_CART = 'GET_CART'
const CREATED_CART = 'CREATED_CART'

//ACTION CREATORS
const gotCart = cart => {
  return {
    type: GOT_CART,
    cart
  }
}

const createdCart = newCart => {
  return {
    type: CREATED_CART,
    newCart
  }
}

//THUNK CREATORS
export const loadCart = userId => {
  return async dispatch => {
    try {
      const {data: cart} = await axios.get('/api/cart/', userId)
      dispatch(gotCart(cart))
    } catch (error) {
      console.log('error loading cart from server')
    }
  }
}

export const createNewCart = () => {
  return async dispatch => {
    try {
      const {data: newCart} = await axios.post('/api/cart/')
      dispatch(createdCart(newCart))
    } catch (error) {
      console.log('error creating new cart from server')
    }
  }
}

//REDUCER

const initialState = {
  cart: {}
}

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case CREATED_CART:
      return action.newCart
    default:
      return state
  }
}
