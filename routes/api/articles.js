const router = require('express').Router()
const path = require('path')
const Article = require('mongoose').model("articles")
const User = require('mongoose').model("users")
const Comment = require('mongoose').model("comments")
const auth = require('../auth')

router.param('slug', (req, res, next, slug)=> {
    Article.findOne({slug}).populate('author').then(article=> {
        req.article = article
        next()
    }).catch(next)
})

router.post('/', auth.required, (req, res, next)=> {
    let {body, description, tagList, title} = req.body.article
    if(!req.user) {
        res.sendStatus(401)
    } else {
        let article = new Article(req.body.article)
        article.author = req.user
        article.save().then(()=> {
            res.json({article: article.toArticleJson(req.user)})
        }).catch(next)
    }
})

router.get('/', auth.required, (req, res, next)=> {
    let {tag, author, favorited, limit, offset} = req.query
    let query = {}
    if(tag) query.tagList = {"$in": [tag]}
    Promise.all([
        author ? User.findOne({username: author}): null,
        favorited ? User.findOne({username: favorited}) :null
    ]).then(results=> {
        author = results[0]
        let favoriter = results[1]

        if(author) query.author = author._id
        if(favoriter) query._id = {$in: favoriter.favorites}

        Promise.all([
            Article.find(query)
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createdAt: 'desc'})
            .populate({
                path: 'author',
            }).exec(),
            Article.countDocuments(query).exec()
        ]).then(results=> {
            res.json({
                articles: results[0].map(doc=> {
                    return doc.toArticleJson(req.user)
                }),
                articlesCount: results[1]
            }) 
        }).catch(next)
    })
    
})

router.get('/feed', auth.required, (req, res, next)=> {
    if(!req.user) res.sendStatus(401)
    else {
        let {limit, offset} = req.query
        let query = {author: {$in: req.user.following}}
        
        Promise.all([
            Article.find({author: {$in: req.user.following}})
            .limit(Number(limit))
            .skip(Number(offset))
            .sort({createdAt: 'desc'})
            .populate({
                path: 'author',
            }).exec(),
            Article.countDocuments(query).exec()
        ]).then(results=> {
            res.json({
                articles: results[0].map(doc=> {
                    return doc.toArticleJson(req.user)
                }),
                articlesCount: results[1]
            })
        }).catch(next)
    }
})

router.get('/:slug',auth.required, (req,res)=> {
    res.json({article: req.article.toArticleJson(req.user)})
})

router.put('/:slug',auth.required ,(req, res, next)=> {
    if(!req.user) res.sendStatus(401)
    else {
        if(req.user._id.toString() === req.article.author._id.toString()) {
            let {title, description, body, tagList} = req.body.article
            req.article.set({title, description, body, tagList})
            req.article.save().then(article=> {
                res.json({article: article.toArticleJson(req.user)})
            }).catch(next)
        } else res.sendStatus(403)
    }
})

router.delete('/:slug',auth.required ,(req, res, next)=> {
    if(!req.user) res.sendStatus(401)
    else {
        if(req.user._id.toString() === req.article.author._id.toString()) {
            req.article.remove().then(()=> {
                res.sendStatus(200)
            }).catch(next)
        } else res.sendStatus(403)
    }
})

router.post('/:slug/comments', auth.required, (req, res, next)=> {
    if(!req.user) res.sendStatus(401)
    else {
        // let {body} = req.body.comment
        let comment = new Comment(req.body.comment)
        comment.author = req.user
        comment.article = req.article
        req.article.addComment(comment)
        comment.save().then(()=> {
            res.json({comment: comment.toCommentJson(req.user)})
        }).catch(next)
    }
})

router.get('/:slug/comments', auth.required, (req, res, next)=> {
    Comment.find({article: {$in: req.article._id}}).populate("author").then(comments=> {
        res.json({comments: comments.map(comment=> {
            return comment.toCommentJson(req.user)
        })})
    }).catch(next)
})

router.delete('/:slug/comments/:id', auth.required, (req, res, next)=> {
    if(!req.user) res.sendStatus(401)
    else {

        Comment.findById(req.params.id).then(comment=> {
            req.article.removeComment(comment)
            return comment.remove()
            
        }).then(()=> res.sendStatus(200))
        .catch(next)
    }
})

router.post('/:slug/favorite', auth.required, (req, res, next)=> {
    if(!req.user) res.sendStatus(401)
    else {
        req.user.favorite(req.article).then(()=> {
            return req.article.updateFavoritesCount()
        }).then(()=> {
            res.json({article: req.article.toArticleJson(req.user)})
        }).catch(next)
    }
})

router.delete('/:slug/favorite', auth.required, (req, res, next)=> {
    if(!req.user) res.sendStatus(401)
    else {
        req.user.unfavorite(req.article).then(()=> {
            return req.article.updateFavoritesCount()
        }).then(()=> {
            res.json({article: req.article.toArticleJson(req.user)})
        }).catch(next)
    }
})

module.exports = router