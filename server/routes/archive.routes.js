import express from 'express'
import archiveCtrl from '../controllers/archive.controller'

const router = express.Router()

router.route('/api/archives')
  .get(archiveCtrl.listPublicArchives)

router.route('/api/archives/:year/:vol/:issue')
  .get(archiveCtrl.listIssue)

router.route('/api/archives/:ref')
  .get(archiveCtrl.archivesByRef)

router.route('/api/search')
  .get(archiveCtrl.searchArchives)

export default router