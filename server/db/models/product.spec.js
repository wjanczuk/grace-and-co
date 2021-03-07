const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(async () => {
    await db.sync({force: true})
  })

  it('requires a name', async () => {
    try {
      await Product.create({
        description: 'This is an earring.',
        category: 'Statement',
        imageUrl: '/img/test',
        price: 90,
        inventory: 100
      })
      throw Error('The product requires a name')
    } catch (error) {
      expect(error.message).to.contain('product.name cannot be null')
    }
  })

  it('requires a description', async () => {
    try {
      await Product.create({
        name: 'Earring',
        category: 'Statement',
        imageUrl: '/img/test',
        price: 90,
        inventory: 100
      })
      throw Error('The product requires a description')
    } catch (error) {
      expect(error.message).to.contain('product.description cannot be null')
    }
  })

  it('requires a category', async () => {
    try {
      await Product.create({
        name: 'Earring',
        description: 'This is an earring.',
        imageUrl: '/img/test',
        price: 90,
        inventory: 100
      })
      throw Error('The product requires a category')
    } catch (error) {
      expect(error.message).to.contain('product.category cannot be null')
    }
  })

  it('requires an imageUrl', async () => {
    try {
      await Product.create({
        name: 'Earring',
        description: 'This is an earring.',
        category: 'Statement',
        price: 90,
        inventory: 100
      })
      throw Error('The product requires an image URL')
    } catch (error) {
      expect(error.message).to.contain('product.imageUrl cannot be null')
    }
  })

  it('requires a price', async () => {
    try {
      await Product.create({
        name: 'Earring',
        description: 'This is an earring.',
        category: 'Statement',
        imageUrl: '/img/test',
        inventory: 100
      })
      throw Error('The product requires a price')
    } catch (error) {
      expect(error.message).to.contain('product.price cannot be null')
    }
  })

  it('requires an inventory amount', async () => {
    try {
      await Product.create({
        name: 'Earring',
        description: 'This is an earring.',
        category: 'Statement',
        imageUrl: '/img/test',
        price: 90
      })
      throw Error('The product requires an inventory')
    } catch (error) {
      expect(error.message).to.contain('product.inventory cannot be null')
    }

    it('beforeCreate to be a function', async () => {
      let product = await Product.create({
        name: 'Earring',
        description: 'This is an earring.',
        category: 'Statement',
        imageUrl: '/img/test',
        price: 90,
        inventory: 100
      })
      expect(product.beforeCreate).to.be.a(
        'function',
        'beforeCreate is not a function'
      )
    })

    it('multiplies the input price value by 100', async () => {
      let product = await Product.create({
        name: 'Earring',
        description: 'This is an earring.',
        category: 'Statement',
        imageUrl: '/img/test',
        price: 90,
        inventory: 100
      })

      product.beforeCreate()

      expect(product.price).to.deep.equal(
        9000,
        'product price is not properly updated'
      )
    })
  })
})
