import axios from 'axios'

// action types
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'

// action creators
const gotProducts = products => ({
  type: GOT_PRODUCTS,
  products
})

export const gotSingleProduct = product => ({
  type: GOT_SINGLE_PRODUCT,
  product
})

// thunk creators
export const getProducts = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(gotProducts(products))
    } catch (error) {
      console.log('Error in getProducts')
    }
  }
}

export const getSingleProduct = productId => {
  return async dispatch => {
    try {
      const {data: product} = await axios.get(`/api/products/${productId}`)
      dispatch(gotSingleProduct(product))
    } catch (error) {
      console.log('Error in getSingleProduct')
    }
  }
}

const initialState = {
  all: [],
  selected: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {
        ...state,
        all: action.products
      }
    case GOT_SINGLE_PRODUCT:
      return {
        ...state,
        selected: action.product
      }
    default:
      return state
  }
}
