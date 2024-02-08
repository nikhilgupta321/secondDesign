import express from 'express'
import authCtrl from '../controllers/auth.controller'
import entriesController from '../controllers/webentry.controller'


const router = express.Router();

router.route('/api/webdata').get(entriesController.getAllEntries);
// Get all items
// router.get('/api/webdata', entriesController.getAllEntries);
// Get a specific item by ID
router.route('/api/webdata/:id').get(entriesController.getEntriesById);
// Add a new item
router.route('/api/webdata').post(entriesController.addEntries);
// Update an item
router.route('/api/webdata/:id').put(entriesController.updateEntries);
// Delete an item
router.route('/api/webdata/:id').delete( entriesController.deleteEntries);


export default router
