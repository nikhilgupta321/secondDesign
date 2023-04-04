import express from 'express'
import editorCtrl from '../controllers/editor.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router()

router.route('/api/editors')
  .get(editorCtrl.listEditors)
  .post(authCtrl.requireSignin, editorCtrl.addEditor)

router.route('/api/editors/:id')
  .get(editorCtrl.editorById)
  .post(authCtrl.requireSignin, editorCtrl.updateEditor)

export default router