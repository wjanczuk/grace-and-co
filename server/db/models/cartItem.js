
const Sequelize = require('sequelize')
const db = require('../db')
//cartitem
const CartItem = db.define('cartItem', {
  price: {
    type: Sequelize.DECIMAL(4,2),
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

})

module.exports = CartItem;
