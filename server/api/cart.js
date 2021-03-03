const router = require('express').Router()
const {Cart} = require('../db/models')
module.exports = router

// GET /api/cart
router.get('/', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({where: {userId: req.body}})
    res.json(cart)
  } catch (error) {
    next(error)
  }
})

//POST /api/cart
router.post('/', async (req, res, next) => {
  try {
    const newCart = await Cart.create()
    res.json(newCart)
  } catch (error) {
    next(error)
  }
})
