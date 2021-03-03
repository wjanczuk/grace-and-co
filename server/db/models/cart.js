const Sequelize = require('sequelize')
const db = require('../db')

//cart model
const Cart = db.define('cart', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  paymentMethod: {
    type: Sequelize.ENUM('debit', 'credit', 'stripe', 'venmo')
  },
  totalQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  orderSubtotal: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0.0,
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
    type: Sequelize.STRING
  },
  shipping_address2: {
    type: Sequelize.STRING
  },
  shipping_city: {
    type: Sequelize.STRING
  },
  shipping_state: {
    type: Sequelize.STRING,
    validate: {
      max: 2
    }
  },
  shipping_ZIP: {
    type: Sequelize.INTEGER,
    validate: {
      len: 5
    }
  }
})

//instance methods
Cart.prototype.updateCartTotals = async function(price, quantity) {
  this.orderSubtotal += price * quantity
  this.totalQuantity += quantity
  await this.save()
}

module.exports = Cart
