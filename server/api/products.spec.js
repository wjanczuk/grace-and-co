const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products', () => {
    const product = {
      name: 'Earring',
      description: 'It hangs from your ear',
      price: 2.75,
      category: 'Beaded',
      imageUrl: '../public/img/Beaded_1_Pink-Citron-Peacock.jpg',
      inventory: 3
    }

    beforeEach(() => {
      return Product.create(product)
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal(product.name)
      expect(res.body[0].description).to.be.equal(product.description)
      expect(res.body[0].price).to.be.equal(product.price)
      expect(res.body[0].category).to.be.equal(product.category)
    })
  })

  describe('/api/products/:productId', () => {
    const product = {
      id: 1,
      name: 'Necklace',
      description: 'It hangs around your neck',
      price: 3.0,
      category: 'Wood',
      imageUrl: '../public/img/Beaded_1_Pink-Citron-Peacock.jpg',
      inventory: 3
    }

    beforeEach(() => {
      return Product.create(product)
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get(`/api/products/${product.id}`)
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal(product.name)
      expect(res.body.description).to.be.equal(product.description)
      expect(res.body.price).to.be.equal(product.price)
      expect(res.body.category).to.be.equal(product.category)
    })
  })
})
