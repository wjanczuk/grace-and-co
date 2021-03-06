import axios from 'axios'

//action types
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const GOT_PRODUCTS_ADMIN = 'GOT_PRODUCTS_ADMIN'
const GOT_SINGLE_PRODUCT = 'GOT_SINGLE_PRODUCT'
const ADDED_PRODUCT = 'ADDED_PRODUCT'
const DELETED_PRODUCT = 'DELETED_PRODUCT'
const UPDATED_PRODUCT = 'UPDATED_PRODUCT'

//action creators
const gotProducts = products => ({
  type: GOT_PRODUCTS,
  products
})

const gotProductsAdmin = products => ({
  type: GOT_PRODUCTS_ADMIN,
  products
})

export const gotSingleProduct = product => ({
  type: GOT_SINGLE_PRODUCT,
  product
})
export const addedProduct = product => ({
  type: ADDED_PRODUCT,
  product
})

export const deletedProduct = productId => ({
  type: DELETED_PRODUCT,
  productId
})
export const updatedProduct = updated => ({
  type: UPDATED_PRODUCT,
  updated
})

//thunk creators
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

export const getProductsAdmin = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/admin/products')
      dispatch(gotProductsAdmin(products))
    } catch (error) {
      console.log('Error in getProductsAdmin')
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

export const addProduct = newProduct => {
  return async dispatch => {
    try {
      const {data: product} = await axios.post('/api/prodcuts', newProduct)
      dispatch(addedProduct(product))
    } catch (error) {
      console.log('Error in adding a product')
    }
  }
}

export const deleteProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deletedProduct(productId))
    } catch (error) {
      console.log('Error in deleting product')
    }
  }
}

export const updateProduct = (productId, update) => {
  return async dispatch => {
    try {
      const {data: updated} = await axios.put(
        `/api/products/${productId}`,
        update
      )
      dispatch(updatedProduct(updated))
    } catch (error) {
      console.log('Error in updating product')
    }
  }
}

const initialState = {
  all: [],
  selected: {}
}

//reducer
export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return {
        ...state,
        all: action.products
      }
    case GOT_PRODUCTS_ADMIN:
      return {
        ...state,
        all: action.products
      }
    case GOT_SINGLE_PRODUCT:
      return {
        ...state,
        selected: action.product
      }
    case ADDED_PRODUCT:
      return {...state, all: [...state.all, action.product]}
    case DELETED_PRODUCT:
      return {
        ...state,
        all: state.all.filter(product => product.id !== action.productId)
      }
    case UPDATED_PRODUCT:
      return {...state, selected: action.updated}
    default:
      return state
  }
}
