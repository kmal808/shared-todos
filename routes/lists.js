const express = require('express')
const router = express.Router()
const listsController = require('../controllers/lists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, listsController.getLists)

router.get('/:id', ensureAuth, listsController.getList)

router.post('/createList', ensureAuth, listsController.createList)

router.delete('/deleteList', ensureAuth, listsController.deleteList)

module.exports = router
