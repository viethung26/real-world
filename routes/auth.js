const jwt = require('jsonwebtoken')
const User = require('mongoose').model('users')

const getToken = (req) => {
    let {authorization} = req.headers
    if(authorization) {
        let bearer = authorization.split(" ")
        if(bearer[0]=== "Token" || bearer[0] ==="Bearer") {
            return bearer[1]
        }
    }
    return null
}
exports.required = (req, res, next)=> {
    jwt.verify(getToken(req), "Hideki", (err, decoded)=> {
        if(err) {
            req.user = null
            next()
        }
        else {
            User.findById(decoded.id).then(user=> {
                req.user = user
                next()
            })
        }
    })
}
// module.exports =