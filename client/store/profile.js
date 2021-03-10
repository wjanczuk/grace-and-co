import axios from 'axios'

//action types
const GET_ORDER_HISTORY = 'GET_ORDER_HISTORY'

//action creators
const getOrderHistory = orders => ({
  type: GET_ORDER_HISTORY,
  orders
})

//thunk creators
export const loadOrderHistory = userId => {
  return async dispatch => {
    try {
      const {data: orders} = await axios.get(`/api/profile/${userId}`)
      dispatch(getOrderHistory(orders))
    } catch (error) {
      console.log('error loading orders from server')
    }
  }
}

const initialState = {
  orders: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_HISTORY:
      return {
        orders
      }
    default:
      return state
  }
}
