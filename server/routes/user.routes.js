import express from 'express'
import authCtrl from '../controllers/auth.controller'
import userCtrl from '../controllers/user.controller'

const router = express.Router()

router.route('/api/users')
  .get(userCtrl.list)
  .post(authCtrl.requireSignin, userCtrl.update)

router.route('/api/users/:id')
  .get(userCtrl.userById)
  .post(authCtrl.requireSignin, userCtrl.update)  

export default router