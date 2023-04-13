import express from 'express'
import adminCtrl from '../controllers/admin.controller'
import authCtrl from '../controllers/auth.controller'
import archiveCtrl from '../controllers/archive.controller'

const router = express.Router()

router.route('/api/admin')
  .get(authCtrl.requireSignin, adminCtrl.count)

export default router