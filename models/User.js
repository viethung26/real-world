const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const UserSchema = new Schema({
    email: {type: String, lowercase: true, unique: true, required: [true, 'can not be blank'], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true },
    username: {type: String, lowercase: true, unique: true, required: [true, 'can not be blank'], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
    bio: String,
    image: String,
    following: [{type: ObjectId, ref: 'users'}],
    favorites: [{type: ObjectId, ref: 'articles'}],
    hash: String,
    salt: String
}, {timestamps: true})

UserSchema.plugin(uniqueValidator, {message: 'is already taken'})

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}
UserSchema.methods.validPassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return hash === this.hash
}

UserSchema.methods.generateToken = function() {
    return jwt.sign({username: this.username, id: this._id}, "Hideki", {expiresIn: "1d"})
}

UserSchema.methods.toAuthJson = function() {
    return {
        id: this._id,
        email: this.email,
        token: this.generateToken(),
        username: this.username,
        bio: this.bio,
        image: this.image,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}
UserSchema.methods.toProfileJson = function(user) {
    return {
        bio: this.bio,
        image: this.image,
        username: this.username,
        following: user ? user.following.some(value=>value.toString()===this._id.toString()) : false
    }
}

UserSchema.methods.follow = function(userId) {
    if(this.following.indexOf(userId)===-1) {
        this.following.push(userId)
    }
    return this.save()
}

UserSchema.methods.unfollow = function(userId) {
    let index = this.following.indexOf(userId)
    if(index !==-1) {
        this.following.splice(index, 1)
    }
    return this.save()
}

UserSchema.methods.isFavorite = function(articleId) {
    return this.favorites.some(val=> val.toString() === articleId.toString())
}

UserSchema.methods.favorite = function(article) {
    let index = this.favorites.indexOf(article._id)
    if(index === -1) this.favorites.push(article._id)
    return this.save()
}

UserSchema.methods.unfavorite = function(article) {
    let index = this.favorites.indexOf(article._id)
    if(index !== -1) this.favorites.splice(index, 1)
    return this.save()
}
mongoose.model('users', UserSchema)