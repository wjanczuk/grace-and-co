const Sequelize = require('sequelize')
const db = require('../db')

//cart
const Cart = db.define('cart', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  paymentMethod: {
    type: Sequelize.ENUM('debit', 'credit', 'stripe', 'venmo')
  },
  orderSubtotal: {
    type: Sequelize.DECIMAL(10, 2),
    get() {
      const value = this.getDataValue('subtotal')
      return parseFloat(value)
    }
  },
  tax: {
    type: Sequelize.DECIMAL(3, 2),
    defaultValue: 4.0 //GA sales tax --> 4.00%
  },
  orderTotal: {
    type: Sequelize.DECIMAL(10, 2),
    get() {
      return this.orderSubtotal * this.tax
    }
  },
  shipping_address: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shipping_address2: {
    type: Sequelize.STRING,
    allowNull: false
  },
  shipping_city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  shipping_state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      max: 2
    }
  },
  shipping_ZIP: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: 5
    }
  }
})

module.exports = Cart
