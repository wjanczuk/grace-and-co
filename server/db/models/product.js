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
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    get() {
      const value = this.getDataValue('price')
      return value === null ? null : parseFloat(value)
    }
  },
  inventory: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0
    },
    allowNull: false
  }
})

module.exports = Product
