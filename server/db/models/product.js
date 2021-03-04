const Sequelize = require('sequelize')
const db = require('../db')

//product model
const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  category: {
    type: Sequelize.ENUM(
      'Beaded',
      'Brass',
      'Lucite + Resin',
      'Wood',
      'Leather',
      'Huggies + Ear Cuffs',
      'Stud',
      'Statement'
    ),
    allowNull: false
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  }
})

//class methods
Product.beforeCreate(product => {
  product.price = product.price * 100
})

module.exports = Product
