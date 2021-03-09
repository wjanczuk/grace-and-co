import axios from 'axios'

// ACTION TYPES
const GOT_ORDER = 'GOT_ORDER'
const REMOVE_ORDER_ITEM = 'REMOVE_ORDER_ITEM'
const EDIT_QUANTITY = 'EDIT_QUANTITY'
const CREATE_ORDER = 'CREATE_ORDER'
const CREATE_ORDERITEM = 'CREATED_ORDERITEM'
const COMPLETE_ORDER = 'COMPLETE_ORDER'

// ACTION CREATORS
const gotOrder = orderObj => ({
  type: GOT_ORDER,
  order: orderObj.items,
  subtotal: orderObj.subtotal,
  total: orderObj.total
})
const removedItem = (itemId, order) => ({
  type: REMOVE_ORDER_ITEM,
  itemId,
  order
})
const editedQuantity = orderObj => ({
  type: EDIT_QUANTITY,
  order: orderObj.order,
  subtotal: orderObj.subtotal
})

const createdOrder = order => ({
  type: CREATE_ORDER,
  order
})

const createdOrderItem = orderObj => ({
  type: CREATE_ORDERITEM,
  order: orderObj.order,
  subtotal: orderObj.subtotal
})

const completedOrder = order => ({
  type: COMPLETE_ORDER,
  order
})

// THUNK CREATORS
export const getOrder = userId => {
  return async dispatch => {
    try {
      const {data: orderObj} = await axios.get(`/api/cart/${userId}`)
      dispatch(gotOrder(orderObj))
    } catch (error) {
      console.log('error loading order from server')
    }
  }
}

export const removeItem = itemId => {
  return async dispatch => {
    try {
      const {data: order} = await axios.delete(`/api/cart/item/${itemId}`)
      dispatch(removedItem(itemId, order))
    } catch (error) {
      console.log('Error removing item from server')
    }
  }
}

export const editQuantity = orderItemObj => {
  return async dispatch => {
    try {
      const {data: orderObj} = await axios.put(
        `/api/cart/item/${orderItemObj.id}`,
        orderItemObj
      )
      dispatch(editedQuantity(orderObj))
    } catch (error) {
      console.log('Error in editing quantity', error)
    }
  }
}

export const createOrGetOrder = () => {
  return async dispatch => {
    try {
      const {data: order} = await axios.post('/api/cart/')
      dispatch(createdOrder(order))
    } catch (error) {
      console.log('error creating new cart from server')
    }
  }
}

export const createOrderItem = (product, qty) => {
  //takes in qty and product
  return async dispatch => {
    try {
      const {data: orderObj} = await axios.post(`/api/cart/${product.id}`, {
        product,
        qty
      })
      dispatch(createdOrderItem(orderObj))
    } catch (error) {
      console.log('error creating new cart item from server')
    }
  }
}

export const completeOrder = userId => {
  return async dispatch => {
    try {
      const {data: order} = await axios.put(`/api/cart/${userId}`)

      dispatch(completedOrder(order))
    } catch (error) {
      console.log('error completing cart from server')
    }
  }
}

const initialState = {
  items: [],
  subtotal: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDER:
      return {
        ...state,
        items: action.order,
        subtotal: action.subtotal
      }
    case REMOVE_ORDER_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.orderItem.id !== action.itemId),
        subtotal: action.order.orderSubtotal
      }
    case EDIT_QUANTITY:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.orderItem.id === action.order.id) {
            item.orderItem.quantity = action.order.quantity
          }
          return item
        }),
        subtotal: action.subtotal
      }
    case CREATE_ORDER:
      return {
        ...state,
        items: action.order
      }
    case CREATE_ORDERITEM:
      return {
        ...state,
        items: action.order,
        subtotal: action.subtotal
      }
    case COMPLETE_ORDER:
      return {
        ...state,
        items: []
      }
    default:
      return state
  }
}
