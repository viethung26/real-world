const router = require('express').Router()
const path = require('path')

router.use('/', require('./users'))
router.use('/profiles', require('./profiles'))
router.use('/articles', require('./articles'))
router.use('/tags', require('./tags'))
module.exports = router