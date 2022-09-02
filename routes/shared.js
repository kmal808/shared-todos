const express = require('express')
const router = express.Router()
const sharedController = require('../controllers/shared')

const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, sharedController.getShared)

router.post('/createShared', sharedController.createShared)

router.put('/markComplete', sharedController.markComplete)

router.put('/markIncomplete', sharedController.markIncomplete)

router.delete('/deleteShared', sharedController.deleteShared)

module.exports = router