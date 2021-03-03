import axios from 'axios'

// ACTION TYPES
const GOT_ITEMS = 'GOT_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'

// ACTION CREATORS
const gotItems = items => ({
  type: GOT_ITEMS,
  items
})
const removedItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
})
const edittedQuantity = (itemId, quantity) => ({
  type: EDIT_QUANTITY,
  itemId,
  quantity
})

// THUNK CREATORS
export const getItems = cartId => {
  return async dispatch => {
    try {
      const {data: items} = await axios.get(`/api/cartItems/${cartId}`)
      dispatch(gotItems(items))
    } catch (error) {
      console.log('Error in getItems')
    }
  }
}
export const removeItem = itemId => {
  return async dispatch => {
    try {
      await axios.delete('/api/cartItems', {itemId})
      dispatch(removedItem(itemId))
    } catch (error) {
      console.log('Error in removeItem')
    }
  }
}
export const editQuantity = (itemId, newQuantity) => {
  return async dispatch => {
    try {
      await axios.put('/api/cartItems', {quantity: newQuantity, itemId})
      dispatch(edittedQuantity(itemId, newQuantity))
    } catch (error) {
      console.log('Error in editQuantity')
    }
  }
}

const initialState = {
  cartItems: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ITEMS:
      return {
        ...state,
        cartItems: action.items
      }
    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.itemId)
      }
    case EDIT_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map(item => {
          if (item.id === action.itemId) {
            item.quantity = action.quantity
          }
          return item
        })
      }
    default:
      return state
  }
}
