const adminAuth = (req, res, next) => {
  const currentUser = req.user
  if (currentUser && currentUser.isAdmin) {
    next()
  } else {
    const error = new Error(
      '<h3>You do not have the necessary administrative privileges.<h3>'
    )
    error.status = 401
    next(error)
  }
}

module.exports = {
  adminAuth
}
