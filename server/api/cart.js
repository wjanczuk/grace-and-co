const router = require('express').Router()
const {OrderItem, Order, User} = require('../db/models')

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
    let user
    console.log('REQ BODY', req.body)
    if (req.body) {
      user = await User.findOrCreate({
        where: {
          email: req.body.email
        }
      })
    }
    const newOrder = await Order.create()
    newOrder.setUser(user[0])
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
          id: req.body.id
        }
      }
    )
    const updatedItem = await OrderItem.findByPk(req.body.id)
    res.send(updatedItem)
  } catch (error) {
    next(error)
  }
})

// POST /api/cart/items
router.post('/items', async (req, res, next) => {
  try {
    const order = await OrderItem.bulkCreate(req.body.products)
    res.send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
