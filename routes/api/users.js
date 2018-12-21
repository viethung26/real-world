const router = require('express').Router()
const path = require('path')
const User = require('mongoose').model('users')
const auth = require('../auth')

router.post('/users', (req, res, next)=> {
    let {username, email, password} = req.body.user
    User.findOne({$or: [{username}, {email}]}).then(doc=> {
        if(doc) res.status(422).json({errors: {"username or email": ["is taken"]}})
        else {
            let user = new User()
            user.username = username
            user.email = email
            user.setPassword(password)
            return user.save().then(function(){
                return res.json({user: user.toAuthJson()})
            })
        }
    }).catch(next)
})
router.post('/users/login', (req, res, next)=> {
    let {email, password} = req.body.user
    User.findOne({email}).then(user=>{
        if(user && user.validPassword(password))
            res.json({user: user.toAuthJson()})
        else res.status(422).json({errors: {"email or password": ["is invalid"]}})
    }).catch(next)
})

router.get('/user', auth.required, (req, res, next)=> {
    let user = req.user
    if(user) res.json({user: user.toAuthJson()})
    else next()
})

router.put('/user', auth.required, (req, res, next)=> {
    let {email, username, password, bio, image} = req.body.user
    let user = req.user
    if(user){
        user.username = username
        user.email = email
        user.bio = bio
        user.image = image
        if(password) user.setPassword(password)
        user.save().then(user=>{
            res.json({user: user.toAuthJson()})
        }).catch(next)
    } else res.sendStatus(401)
})
module.exports = router