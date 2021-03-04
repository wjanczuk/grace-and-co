const Sequelize = require('sequelize')
const db = require('../db')

//orderItem model
const OrderItem = db.define('orderItem', {
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
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  }
})

module.exports = OrderItem
