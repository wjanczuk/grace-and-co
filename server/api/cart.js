const router = require('express').Router()
const {OrderItem, Order} = require('../db/models')

//GET /api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId
      }
    })
    const orderItems = await order.getProducts()
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

//POST /api/cart
router.post('/', async (req, res, next) => {
  try {
    const newOrder = await Order.create()
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

//DELETE /api/cart
router.delete('/', async (req, res, next) => {
  try {
    await OrderItem.destroy({
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
    await OrderItem.update(
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
