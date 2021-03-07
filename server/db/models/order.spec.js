const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  it('status defaults to in-progress if not provided', async () => {
    let order = await Order.create()
    expect(order.status).to.be.equal('in-progress')
  })

  it('tax defaults to 1.04 if not provided', async () => {
    let order = await Order.create()
    expect(order.tax).to.be.equal('1.04')
  })

  it('orderSubtotal defaults to 0 if not provided', async () => {
    let order = await Order.create()
    expect(order.orderSubtotal).to.be.equal(0)
  })

  it('orderTotal equals Math.round(this.orderSubtotal * this.tax * 100) / 100', async () => {
    let order = await Order.create({
      orderSubtotal: 90
    })
    expect(order.orderTotal).to.be.equal(93.6)
  })

  it('updateOrderSubtotal to be a function', async () => {
    let order = await Order.create()
    expect(order.updateOrderSubtotal).to.be.a(
      'function',
      'orderSubtotal is not a function'
    )
  })

  it('updateOrderSubtotal updates the order subtotal', async () => {
    let order = await Order.create({
      status: 'completed',
      paymentMethod: 'venmo',
      shippingAddress: '2050 2nd Ave.',
      shippingCity: 'Minneapolis',
      shippingState: 'MN',
      shippingZIP: 55408,
      billingAddress: '2050 2nd Ave.',
      billingCity: 'Minneapolis',
      billingState: 'MN',
      billingZIP: 55408,
      orderSubtotal: 90
    })

    order.updateOrderSubtotal(360, 1)

    expect(order.orderSubtotal).to.deep.equal(
      450,
      'orderSubtotal is not properly updated'
    )
  })
})
