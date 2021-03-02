const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')
const CartItem = require('./cartItem')

Cart.belongsToMany(Product, {through: CartItem})
Product.belongsToMany(Cart, {through: CartItem})
User.hasMany(Cart)
Cart.belongsTo(User)

module.exports = {
  User,
  Product,
  Cart,
  CartItem
}
