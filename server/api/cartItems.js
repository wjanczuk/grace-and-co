//PUT request for a new cart item
//include the below instance method
Cart.prototype.updateCartTotals = async function(price, quantity) {
  this.orderSubtotal += price * quantity
  this.totalQuantity += quantity
  await this.save()
}
