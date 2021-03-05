const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Cart = db.model('cart')
const CartItem = db.model('cartItem')
const User = db.model('user')
const Product = db.model('product')

describe.only('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  //gets cart items
  describe('/api/cart/:userId', () => {
    let cart
    let cartItems
    let user
    let product

    beforeEach(async () => {
      await db.sync({force: true})
      user = await User.create({
        email: 'victoria@me.com',
        password: 'invisiblewoman2',
        first_name: 'Victoria',
        last_name: 'Ho',
        isAdmin: true
      })
      cart = await Cart.create({
        userId: user.id
      })
      product = await Product.create({
        name: 'Flower Studs',
        description: `14k solid gold`,
        category: 'Stud',
        imageUrl: 'img/Stud_12.jpg',
        price: 425.0,
        inventory: 5
      })

      cartItems = await Promise.all([
        CartItem.create({productId: product.id, cartId: cart.id})
      ])
    })

    it('GET /api/cart/:userId', async () => {
      const res = await request(app)
        .get(`/api/cart/${cart.userId}`)
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].price).to.be.equal(425.0)
    })
  })

  it('DELETE /api/cart', async () => {
    const itemId = 1
    const res = await request(app)
      .delete(`/api/cart`)
      .send({itemId})
      .expect(200)

    const cartItem = await CartItem.findByPk(itemId)

    expect(res.body).to.be.an('object')

    expect(cartItem).to.be.equal(null)
  })
})
