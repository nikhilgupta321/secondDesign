import express from 'express'
import userCtrl from '../controllers/user.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/users')
  .get(authCtrl.requireSignin, authCtrl.hasAuthorization, userCtrl.list)
  .post(userCtrl.create)

router.route('/api/users/:id')
  .put(authCtrl.requireSignin, authCtrl.hasAuthorization,
    userCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.hasAuthorization,
    userCtrl.remove)

export default router