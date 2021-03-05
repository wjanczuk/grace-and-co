const router = require('express').Router()
const {Product} = require('../db/models')

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
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

// POST  /api/products - route to create new campus
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.status(201).send(newProduct)
    return
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:productId route to delete campus
router.delete('/:productId', async (req, res, next) => {
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

// PUT /api/products/:productId - route to update product
router.put('/:productId', async (req, res, next) => {
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
