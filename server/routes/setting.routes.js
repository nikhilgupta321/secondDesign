import express from 'express'
import authCtrl from '../controllers/auth.controller'
import settingsCtrl from '../controllers/setting.controller'

const router = express.Router()

router.route('/api/settings')
  .get(settingsCtrl.list)
  .post(authCtrl.requireSignin, settingsCtrl.update)

export default router