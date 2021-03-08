const router = require('express').Router()
const {OrderItem, Order, Product, User} = require('../db/models')

//GET /api/cart/:userId -- /cart
router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOrCreate({
      where: {
        userId: req.params.userId,
        status: 'in-progress'
      }
    })

    const orderItems = await order[0].getProducts()
    res.json(orderItems)
  } catch (error) {
    next(error)
  }
})

//POST /api/cart/  //FIND OR CREATE CART/ORDER
router.post('/', async (req, res, next) => {
  try {
    let user
    if (Object.keys(req.body).length) {
      user = await User.findOrCreate({
        where: {
          email: req.body.email
        }
      })
      user = user[0].id
    } else {
      user = req.session.passport.user
    }

    let order = await Order.findOrCreate({
      where: {
        userId: user,
        status: 'in-progress'
      }
    })
    if (!Object.keys(req.body).length) {
      order = await order[0].getProducts()
    } else {
      order = order[0]
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
})

// POST /api/cart/items -- single product view
router.post('/items', async (req, res, next) => {
  try {
    await OrderItem.bulkCreate(req.body.products)
    const order = await Order.findByPk(req.body.products[0].orderId)
    await order.update({
      status: 'completed'
    })
    res.send(order)
  } catch (error) {
    next(error)
  }
})

//POST /api/cart/:productId -- add to cart
router.post('/:productId', async (req, res, next) => {
  try {
    let order
    let orderItem
    let checkUser = req.session.passport
    order = await Order.findOrCreate({
      where: {
        userId: checkUser.user,
        status: 'in-progress'
      },
      include: [Product]
    })

    console.log('order-->', order)
    orderItem = await OrderItem.findOrCreate({
      where: {
        productId: req.params.productId,
        orderId: order[0].id,
        price: req.body.product.price
      }
    })
    order = await order[0].getProducts()
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
    res.send(updatedItem)
  } catch (error) {
    next(error)
  }
})

//PUT /api/cart/:userId
router.put('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'in-progress'
      }
    })

    await order.update(
      {
        status: 'completed'
      },
      {
        where: {
          id: order.id,
          userId: req.params.userId
        }
      }
    )
    const updatedOrder = await Order.findByPk(order.id)
    res.send(updatedOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router
