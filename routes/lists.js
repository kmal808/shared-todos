const express = require('express')
const router = express.Router()
const listsController = require('../controllers/lists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/lists', ensureAuth, listsController.getLists)

router.post('/lists/createList', listsController.createList)

router.put('/lists/markComplete', listsController.markComplete)

router.put('/lists/markIncomplete', listsController.markIncomplete)

router.delete('/lists/deleteList', listsController.deleteList)

module.exports = router