import express from 'express'
import pdfCtrl from '../controllers/pdf.controller'

const router = express.Router()

router.route('/api/pdf/certificate/:refnumber/:author')
  .get(pdfCtrl.generateCertificate)

router.route('/api/pdf/coverpage/:refnumber')
  .get(pdfCtrl.generateCoverpage)

router.route('/api/pdf/editorialboard/')
  .get(pdfCtrl.generateEditorialBoard)

router.route('/api/pdf/indexpage/')
  .post(pdfCtrl.generateIndexPage)

router.route('/api/pdf/editorscertificate/')
  .post(pdfCtrl.generateEditorCertificates)

router.route('/api/pdf/bulkcertificates/')
  .post(pdfCtrl.generateBulkCertificates)

export default router