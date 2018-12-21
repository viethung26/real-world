const router = require('express').Router()
const path = require('path')
const auth = require('../auth')
const User = require('mongoose').model('users')

router.param("username", (req, res, next, username)=> {
    User.findOne({username}).then(user=>{
        req.profile = user
        next()
    }).catch(next)
})

router.get('/:username', auth.required, (req, res, next)=> {
    let profile = req.profile
    if(!profile) res.sendStatus(401)
    else {
        res.json({profile: profile.toProfileJson(req.user)})
    }
})

router.post('/:username/follow', auth.required, (req, res, next)=> {
    let profile = req.profile
    if(!profile) res.sendStatus(401)
    else {
        let user = req.user
        if(user) {
            user.follow(profile._id).then(()=>{
                res.json({profile: profile.toProfileJson(user)})
            }).catch(next)
        } else res.sendStatus(401)
    }
})

router.delete('/:username/follow', auth.required, (req, res, next)=> {
    let profile = req.profile
    if(!profile) res.sendStatus(401)
    else {
        let user = req.user
        if(user) {
            user.unfollow(profile._id).then(()=>{
                res.json({profile: profile.toProfileJson(user)})
            }).catch(next)
        } else res.sendStatus(401)  
    }   
})


module.exports = router