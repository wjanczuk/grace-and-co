import axios from 'axios'

// ACTION TYPES
const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'

// ACTION CREATORS
const gotOrder = order => ({
  type: GOT_ORDER,
  order
})
const removedItem = itemId => ({
  type: REMOVE_ORDER_ITEM,
  itemId
})
const editedQuantity = (itemId, quantity) => ({
  type: EDIT_QUANTITY,
  itemId,
  quantity
})

// THUNK CREATORS
export const getOrder = userId => {
  return async dispatch => {
    try {
      const {data: order} = await axios.get(`/api/cart/${userId}`)
      dispatch(gotOrder(order))
    } catch (error) {
      console.log('error loading order from server')
    }
  }
}
export const removeItem = itemId => {
  return async dispatch => {
    try {
      await axios.delete('/api/cart', {itemId})
      dispatch(removedItem(itemId))
    } catch (error) {
      console.log('Error removing item from server')
    }
  }
}
export const editQuantity = (itemId, newQuantity) => {
  return async dispatch => {
    try {
      await axios.put('/api/cart', {quantity: newQuantity, itemId})
      dispatch(editedQuantity(itemId, newQuantity))
    } catch (error) {
      console.log('Error in editing quantity')
    }
  }
}

const initialState = {
  items: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER:
      return {
        ...state,
        items: action.order
      }
    case REMOVE_ORDER_ITEM:
      return {
        ...state,
        items: state.order.filter(item => item.id !== action.itemId)
      }
    case EDIT_QUANTITY:
      return {
        ...state,
        items: state.order.map(item => {
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
