import express from 'express'
import adminCtrl from '../controllers/admin.controller'
import authCtrl from '../controllers/auth.controller'
import archiveCtrl from '../controllers/archive.controller'
import settingsCtrl from '../controllers/setting.controller'

const router = express.Router()

router.route('/api/admin')
  .get(authCtrl.requireSignin, adminCtrl.count)

router.route('/api/admin/archives')
  .get(authCtrl.requireSignin, archiveCtrl.adminArchives)
  .post(authCtrl.requireSignin, archiveCtrl.addArticle)

router.route('/api/admin/create-issue')
  .post(authCtrl.requireSignin, archiveCtrl.createNewIssue)

router.route('/api/admin/archives/:ref')
  .post(authCtrl.requireSignin, archiveCtrl.updateArticle)

router.route('/api/settings')
  .get(settingsCtrl.list)
  .post(authCtrl.requireSignin, settingsCtrl.update)

export default router