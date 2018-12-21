const router = require('express').Router()
const path = require('path')
const Article = require('mongoose').model('articles')

router.get('/', (req, res, next)=> {
    Article.find().distinct('tagList').then(tags=> {
        return res.json({tags})
    }).catch(next)
})

module.exports = router