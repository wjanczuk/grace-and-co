const router = require('express').Router()
const {User, Product} = require('../db/models')
const {adminAuth} = require('./adminAuth')
module.exports = router

// GET /api/admin/users
router.get('/users/', adminAuth, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/admin/products
router.get('/products/', adminAuth, async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})
