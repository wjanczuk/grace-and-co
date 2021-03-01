
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING
  },
  price: {
   type: Sequelize.DECIMAL,
   allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    }

  }


})

module.exports = Product;
