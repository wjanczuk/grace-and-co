'use strict'

const seed = require('./seed')
const {User, Product, Cart, CartItem} = require('../server/db/models')
const {expect} = require('chai')

describe('seed script', () => {
  beforeEach(seed)
  it('creates at least 5 users', async () => {
    const users = await User.findAll()
    expect(users).to.have.lengthOf.at.least(5)
  })
  it('creates at least 100 products', async () => {
    const products = await Product.findAll()
    expect(products).to.have.lengthOf.at.least(100)
  })
  it('creates at least 4 carts', async () => {
    const carts = await Cart.findAll()
    expect(carts).to.have.lengthOf.at.least(4)
  })
  it('creates at least 10 cart items', async () => {
    const cartItems = await CartItem.findAll()
    expect(cartItems).to.have.lengthOf.at.least(10)
  })
})
