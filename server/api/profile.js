const router = require('express').Router()
const {OrderItem, Order, Product, User} = require('../db/models')

//GET /api/profile/:userId -- order history
router.get('/:userId', async (req, res, next) => {
  console.log('req.session-->', req.session)
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.userId,
        status: 'completed'
      },
      include: {model: Product, through: OrderItem}
    })
    res.json(orders)
  } catch (error) {
    next(error)
  }
})

module.exports = router
