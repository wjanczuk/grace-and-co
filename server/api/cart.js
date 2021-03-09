const router = require('express').Router()
const {OrderItem, Order, Product, User} = require('../db/models')

//GET /api/cart/:userId --> logged in user clicks on cart
router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'in-progress'
      }
    })

    let orderItems
    if (order) {
      // if they have an order grab orderItems and get subtotal
      orderItems = await order.getProducts()
      let subtotal = 0
      orderItems.forEach(item => {
        subtotal += item.orderItem.quantity * item.orderItem.price
      })
      await order.updateOrderSubtotal(subtotal)
      res.status(200).json({
        items: orderItems,
        subtotal: order.orderSubtotal
      })
    } else {
      res.status(200)
    }
  } catch (error) {
    next(error)
  }
})

//POST /api/cart/ -- creates/finds logged in user order when clicking add to cart OR creates order for guest when checking out
router.post('/', async (req, res, next) => {
  try {
    let user
    if (Object.keys(req.body).length) {
      // finds or creates guest user with given email
      user = await User.findOrCreate({
        where: {
          email: req.body.email
        }
      })
      user = user[0].id
    } else {
      user = req.session.passport.user // if logged in, grabs user id for session passport
    }

    let order = await Order.findOrCreate({
      // finds or creates an order for guest or logged in user
      where: {
        userId: user,
        status: 'in-progress'
      }
    })
    if (!Object.keys(req.body).length) {
      // if it's a logged in user, will grab order products
      order = await order[0].getProducts()
    } else {
      order = order[0] // if guest will return order (has no order items at this point)
    }

    res.json(order)
  } catch (error) {
    next(error)
  }
})

//POST /api/cart/items/:orderId -- guest checkout
router.post('/items/:orderId', async (req, res, next) => {
  try {
    await OrderItem.bulkCreate(req.body.products)
    const order = await Order.findOne({
      where: {
        id: req.params.orderId,
        status: 'in-progress'
      }
    })
    await order.update({
      status: 'completed'
    })
    res.status(201).send(order)
  } catch (error) {
    next(error)
  }
})

//POST /api/cart/:productId -- add to cart
router.post('/:productId', async (req, res, next) => {
  // creates an order item with product obj as req.body
  try {
    let checkUser = req.session.passport
    let order = await Order.findOne({
      // shouldn't an order be made already from the previous route?
      where: {
        userId: checkUser.user,
        status: 'in-progress'
      }
    })
    await OrderItem.findOrCreate({
      where: {
        productId: req.params.productId,
        orderId: order.id,
        price: req.body.product.price
      }
    })
    let orderItems = await order.getProducts()
    res.status(201).json({
      subtotal: order.orderSubtotal,
      order: orderItems,
      total: order.orderTotal
    })
  } catch (error) {
    next(error)
  }
})

//DELETE /api/cart/item/:itemId -- remove item in cart
router.delete('/item/:itemId', async (req, res, next) => {
  try {
    const orderItem = await OrderItem.findByPk(req.params.itemId)
    const order = await Order.findByPk(orderItem.orderId)
    let subtotal = order.orderSubtotal - orderItem.price * orderItem.quantity
    await order.updateOrderSubtotal(subtotal)
    await orderItem.destroy()
    res.status(200).send(order)
  } catch (error) {
    next(error)
  }
})

//PUT /api/cart -- update quantity
router.put('/item/:itemId', async (req, res, next) => {
  // update quantity for orderItem with quantity in req.body
  try {
    const orderItem = await OrderItem.findByPk(req.params.itemId)
    let subtract
    if (orderItem.quantity > req.body.quantity) {
      subtract = true
    }
    await orderItem.update({
      quantity: req.body.quantity
    })

    const cart = await Order.findOne({
      where: {
        id: req.body.orderId,
        status: 'in-progress'
      }
    })
    let subtotal
    if (subtract) {
      subtotal = cart.orderSubtotal - orderItem.price
    } else {
      subtotal = cart.orderSubtotal + orderItem.price
    }

    await cart.updateOrderSubtotal(subtotal)
    res.status(200).send({
      order: orderItem,
      subtotal: cart.orderSubtotal
    })
  } catch (error) {
    next(error)
  }
})

//PUT /api/cart/:userId -- user checkout
router.put('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.userId,
        status: 'in-progress'
      }
    })

    await order.update({
      status: 'completed'
    })
    res.status(200).send(order)
  } catch (error) {
    next(error)
  }
})

module.exports = router
