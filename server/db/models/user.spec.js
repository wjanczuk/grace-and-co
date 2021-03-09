// const {expect} = require('chai')
// const db = require('../index')
// const User = db.model('user')

// describe('User model', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('instanceCreation', () => {
//     let weronika

//     beforeEach(async () => {
//       weronika = await User.create({
//         firstName: 'Weronika',
//         lastName: 'Janczuk',
//         email: 'weronika@me.com',
//         password: 'invisiblewoman3'
//       })
//     })

//     it('isAdmin defaults to false', async () => {
//       expect(weronika.isAdmin).to.be.equal(false)
//     })
//   })

//   describe('instanceMethods', () => {
//     describe('correctPassword', () => {
//       let weronika

//       beforeEach(async () => {
//         weronika = await User.create({
//           firstName: 'Weronika',
//           lastName: 'Janczuk',
//           email: 'weronika@me.com',
//           password: 'invisiblewoman3'
//         })
//       })

//       it('returns true if the password is correct', () => {
//         expect(weronika.correctPassword('invisiblewoman3')).to.be.equal(true)
//       })

//       it('returns false if the password is incorrect', () => {
//         expect(weronika.correctPassword('invisiblewoman')).to.be.equal(false)
//       })
//     })
//   })
// })
