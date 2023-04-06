import express from 'express'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/auth/sendOtp')
  .post(authCtrl.sendOtp)

router.route('/auth/verifyOtp')
  .post(authCtrl.verifyOtp)

router.route('/auth/authenticate')
  .post(authCtrl.authenticate)

router.route('/auth/verify-token')
  .get(authCtrl.requireSignin, authCtrl.verifyToken)

export default router