const express = require('express')
const router = express.Router()
const listsController = require('../controllers/lists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, listsController.getLists)

router.post('/createList', listsController.createList)

router.put('/markComplete', listsController.markComplete)

router.put('/markIncomplete', listsController.markIncomplete)

router.delete('/deleteList', listsController.deleteList)

module.exports = router
