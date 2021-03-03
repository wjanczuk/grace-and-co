const router = require('express').Router()
const {CartItem, Cart} = require('../db/models')

//GET /api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        userId: req.params.userId
      }
    })
    const cartItems = await cart.getProducts()
    res.json(cartItems)
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

//DELETE /api/cart
router.delete('/', async (req, res, next) => {
  try {
    await CartItem.destroy({
      where: {
        id: req.body.itemId
      }
    })
    res.sendStatus(200)
  } catch (error) {
    next(error)
  }
})

//PUT /api/cart
router.put('/', async (req, res, next) => {
  try {
    await CartItem.update(
      {
        quantity: req.body.quantity
      },
      {
        where: {
          id: req.body.itemId
        }
      }
    )
  } catch (error) {
    next(error)
  }
})

module.exports = router
