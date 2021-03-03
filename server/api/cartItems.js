const router = require('express').Router()
const {CartItem} = require('../db/models')

// GET /api/cartItems/:cartId
router.get('/:cartId', async (req, res, next) => {
  try {
    const cartItems = await CartItem.findAll({
      where: {
        cartId: req.params.cartId
      }
    })
    res.json(cartItems)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/cartItems
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

// PUT /api/cartItems
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
