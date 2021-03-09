const Sequelize = require('sequelize')
const db = require('../db')

//order model
const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM('in-progress', 'completed', 'shipped'),
    defaultValue: 'in-progress'
  },
  paymentMethod: {
    type: Sequelize.ENUM('debit', 'credit', 'stripe', 'venmo')
  },
  orderSubtotal: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false,
    defaultValue: 0
  },
  tax: {
    type: Sequelize.DECIMAL,
    defaultValue: 1.04 //GA sales tax --> 4.00%
  },
  orderTotal: {
    type: Sequelize.INTEGER,
    get() {
      return Math.round(this.orderSubtotal * this.tax * 100) / 100
    }
  },
  billingAddress: {
    type: Sequelize.STRING
  },
  billingAddress2: {
    type: Sequelize.STRING
  },
  billingCity: {
    type: Sequelize.STRING
  },
  billingState: {
    type: Sequelize.STRING,
    validate: {
      max: 2
    }
  },
  billingZIP: {
    type: Sequelize.INTEGER,
    validate: {
      len: 5
    }
  },
  shippingAddress: {
    type: Sequelize.STRING
  },
  shippingAddress2: {
    type: Sequelize.STRING
  },
  shippingCity: {
    type: Sequelize.STRING
  },
  shippingState: {
    type: Sequelize.STRING,
    validate: {
      max: 2
    }
  },
  shippingZIP: {
    type: Sequelize.INTEGER,
    validate: {
      len: 5
    }
  }
})

//instance methods
Order.prototype.updateOrderSubtotal = async function(subtotal) {
  this.orderSubtotal = subtotal
  await this.save()
}

module.exports = Order
