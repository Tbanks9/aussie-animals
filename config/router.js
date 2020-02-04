const router = require('express').Router()
const animals = require('../controllers/animals')
const users = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')


router.route('/animals')
  .get(animals.index)
  .post(secureRoute, animals.create)

router.route('/animals/:id')
  .get(animals.show)
  .put(secureRoute, animals.update)
  .delete(secureRoute, animals.deleteItem)

router.route('/animals/:id/comments')
  .post(secureRoute, animals.commentCreate)

router.route('/animals/:id/comments/:commentId')
  .delete(secureRoute, animals.commentDelete)

router.route('/register')
  .post(users.register)

router.route('/login')
  .post(users.login)

module.exports = router