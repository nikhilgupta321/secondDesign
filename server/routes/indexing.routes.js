import express from 'express'
import indexingCtrl from '../controllers/indexing.controller'

const router = express.Router()

router.route('/api/indexing')
  .get(indexingCtrl.list)

export default router