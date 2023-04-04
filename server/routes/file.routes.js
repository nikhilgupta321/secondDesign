import express from 'express'
import fileCtrl from '../controllers/file.controller'

const router = express.Router()

router.route('/api/download/:resource/:fileName')
  .get(fileCtrl.download)

export default router