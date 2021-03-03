const Sequelize = require('sequelize')
const db = require('../db')

//cartItem model
const CartItem = db.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
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
