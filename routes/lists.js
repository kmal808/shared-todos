const express = require('express')
const router = express.Router()
const listsController = require('../controllers/lists') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, listsController.getAllLists)

router.get('/:id', ensureAuth, listsController.getList)

router.post('/createList', ensureAuth, listsController.createList)

router.delete('/deleteList', ensureAuth, listsController.deleteList)

router.post('/addUser/:id', ensureAuth, listsController.addUser)

router.delete('/removeUser', ensureAuth, listsController.removeUser)


module.exports = router