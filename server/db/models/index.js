const User = require('./user')
const Product = require('./product')
const Order = require('./order')
const OrderItem = require('./orderItem')

Order.belongsToMany(Product, {through: OrderItem})
Product.belongsToMany(Order, {through: OrderItem})
User.hasMany(Order)
Order.belongsTo(User)

module.exports = {
  User,
  Product,
  Order,
  OrderItem
}
