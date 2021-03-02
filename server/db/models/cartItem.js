const Sequelize = require('sequelize')
const db = require('../db')

//cartItem
const CartItem = db.define('cartItem', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 500
    },
    defaultValue: 1
  }
})

module.exports = CartItem
