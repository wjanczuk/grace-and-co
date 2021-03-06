const router = require('express').Router()
const {User} = require('../db/models')
const {adminAuth} = require('./adminAuth')
module.exports = router

// GET /api/users
router.get('/', adminAuth, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'email', 'first_name', 'last_name']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
