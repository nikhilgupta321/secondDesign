import express from 'express'
import authCtrl from '../controllers/auth.controller'
import archiveCtrl from '../controllers/archive.controller'

const router = express.Router()

router.route('/api/archives')
  .get(archiveCtrl.listPublicArchives)

router.route('/api/archives/:year/:vol/:issue')
  .get(archiveCtrl.listIssue)

router.route('/api/admin/archives')
  .get(authCtrl.requireSignin, archiveCtrl.listAdminArchives)
  .post(authCtrl.requireSignin, archiveCtrl.addArticle)

router.route('/api/admin/create-issue')
  .post(authCtrl.requireSignin, archiveCtrl.createNewIssue)

router.route('/api/archives/ref/:ref')
  .get(archiveCtrl.archivesByRef)

router.route('/api/archives/:id')
  .get(archiveCtrl.archivesById)
  .post(authCtrl.requireSignin, archiveCtrl.updateArticle)

router.route('/api/search')
  .get(archiveCtrl.searchArchives)

export default router