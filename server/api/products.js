const router = require('express').Router()
const {Product} = require('../db/models')
const {adminAuth} = require('./adminAuth')

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'inventory']
      }
    })
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// POST  /api/products
router.post('/', adminAuth, async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).send(newProduct)
    return
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:productId
router.delete('/:productId', adminAuth, async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        productId: req.params.productId
      }
    })
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

// PUT /api/products/:productId
router.put('/:productId', adminAuth, async (req, res, next) => {
  try {
    const {productId} = req.params
    const product = await Product.findByPk(productId)
    const updateProduct = await product.update(req.body)
    res.status(200).send(updateProduct)
  } catch (error) {
    next(error)
  }
})

module.exports = router
