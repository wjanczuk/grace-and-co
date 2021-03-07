const router = require('express').Router()
const {OrderItem, Order, Product, User} = require('../db/models')

//GET /api/cart/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'in-progress'
      }
    })
    const orderItems = await order.getProducts()
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

//POST /api/cart/  //FIND OR CREATE CART/ORDER
router.post('/', async (req, res, next) => {
  try {
    console.log('req session', req.session)

    let user
    if (req.body) {
      user = await User.findOrCreate({
        where: {
          email: req.body.email
        }
      })
      user = user[0]
    } else {
      user = req.session.passport
    }

    let order = await Order.findOrCreate({
      where: {
        userId: user.id
      }
    })
    if (!req.body) {
      order = await order[0].getProducts()
    } else {
      order = order[0]
    }

    console.log('ORDER ==>', order)

    res.json(order)
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
    console.log(updatedItem)
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
