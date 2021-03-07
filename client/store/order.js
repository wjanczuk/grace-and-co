import axios from 'axios'

// ACTION TYPES
const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const CREATE_ORDER = 'CREATE_ORDER'
const CREATE_ORDERITEM = 'CREATED_ORDERITEM'

// ACTION CREATORS
const gotOrder = order => ({
  type: GOT_ORDER,
  order
})
const removedItem = itemId => ({
  type: REMOVE_ORDER_ITEM,
  itemId
})
const editedQuantity = itemObj => ({
  type: EDIT_QUANTITY,
  itemObj
})

const createdOrder = order => ({
  type: CREATE_ORDER,
  order
})

const createdOrderItem = order => ({
  type: CREATE_ORDERITEM,
  order
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
      await axios.delete('/api/cart', {data: {itemId}})
      dispatch(removedItem(itemId))
    } catch (error) {
      console.log('Error removing item from server')
    }
  }
}
export const editQuantity = itemObj => {
  return async dispatch => {
    try {
      const {data: updatedItem} = await axios.put('/api/cart', itemObj)
      dispatch(editedQuantity(updatedItem))
    } catch (error) {
      console.log('Error in editing quantity')
    }
  }
}

export const createOrder = () => {
  return async dispatch => {
    try {
      const {data: order} = await axios.post('/api/cart/')
      dispatch(createdOrder(order))
    } catch (error) {
      console.log('error creating new cart from server')
    }
  }
}

export const createOrderItem = product => {
  return async dispatch => {
    try {
      const {data: order} = await axios.post(`/api/cart/${product.id}`, {
        product
      })
      dispatch(createdOrderItem(order))
    } catch (error) {
      console.log('error creating new cart item from server')
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
        items: state.items.filter(item => item.orderItem.id !== action.itemId)
      }
    case EDIT_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.orderItem.id === action.itemObj.id) {
            item.orderItem.quantity = action.itemObj.quantity
          }
          return item
        })
      }
    case CREATE_ORDER:
      return {
        ...state,
        items: action.order
      }
    case CREATE_ORDERITEM:
      return {
        ...state,
        items: action.order
      }
    default:
      return state
  }
}
