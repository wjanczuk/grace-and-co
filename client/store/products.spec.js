import {expect} from 'chai'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {createStore} from 'redux'
import reducer, {
  gotProducts,
  gotSingleProduct,
  getProducts,
  getSingleProduct
} from './products'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('product store', () => {
  let store
  let mockAxios

  const initialState = {
    all: [],
    selected: {}
  }

  const fakeProducts = [
    {
      id: 1,
      name: 'Earrings',
      description: 'It hangs on your ears.',
      price: 4.55
    },
    {
      id: 2,
      name: 'Necklace',
      description: 'It hangs around your neck',
      price: 6.9
    }
  ]

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
    mockAxios.onGet('/api/products').reply(200, fakeProducts)
    mockAxios.onGet('/api/products/2').reply(200, fakeProducts[1])
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('product action creators', () => {
    it('gotProducts action creator returns a valid action', () => {
      expect(gotProducts(fakeProducts)).to.deep.equal({
        type: 'GOT_PRODUCTS',
        products: fakeProducts
      })
    })
    it('gotSingleProduct action creator returns a valid action', () => {
      expect(gotSingleProduct(fakeProducts[0])).to.deep.equal({
        type: 'GOT_SINGLE_PRODUCT',
        product: fakeProducts[0]
      })
    })
  })

  describe('product thunks', () => {
    it('getProducts eventually dispatches the GOT_PRODUCTS action', async () => {
      await store.dispatch(getProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_PRODUCTS')
      expect(actions[0].products).to.be.deep.equal(fakeProducts)
    })
    it('getSingleProduct eventually dispatches the GOT_SINGLE_PRODUCT action', async () => {
      await store.dispatch(getSingleProduct(fakeProducts[1].id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_SINGLE_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProducts[1])
    })
  })

  describe('product reducer', () => {
    let testStore
    beforeEach(() => {
      testStore = createStore(reducer)
    })
    it('GOT_PRODUCTS sets products on state', () => {
      const action = {
        type: 'GOT_PRODUCTS',
        products: fakeProducts
      }
      const prevState = testStore.getState()
      testStore.dispatch(action)
      const newState = testStore.getState()
      expect(newState.all).to.deep.equal(fakeProducts)
      expect(newState.all).to.not.be.equal(prevState.all)
    })
    it('GOT_SINGLE_PRODUCT sets product on state', () => {
      const action = {
        type: 'GOT_SINGLE_PRODUCT',
        product: fakeProducts[0]
      }
      const prevState = testStore.getState()
      testStore.dispatch(action)
      const newState = testStore.getState()
      expect(newState.selected).to.deep.equal(fakeProducts[0])
      expect(newState.selected).to.not.be.equal(prevState.selected)
    })
  })
})
