const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const slug = require('slug')
const User = mongoose.model('users')

let ArticleSchema = new Schema({
    slug: {type:String, lowercase: true, unique: true},
    title: {type: String, required: [true, "can't be blank"]},
    description: {type: String, required: [true, "can't be blank"]},
    body: {type: String, required: [true, "can't be blank"]},
    tagList: [{type: String}],
    favoritesCount: {type: Number, default: 0},
    comments: [{type: ObjectId, ref: "comments"}],
    author: {type: mongoose.Schema.Types.ObjectId, ref: "users"}
}, {timestamps: true})

ArticleSchema.pre('validate', function(next){
    if(!this.slug) this.slugify()
    next()
})
ArticleSchema.methods.slugify = function() {
    this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

ArticleSchema.methods.toArticleJson = function(user) {
    return {
        slug: this.slug,
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        favorited: user? user.isFavorite(this._id): false,
        favoritesCount: this.favoritesCount,
        author: this.author.toProfileJson(user)
    }
}

ArticleSchema.methods.addComment = function(comment) {
    let index = this.comments.indexOf(comment._id)
    if(index === -1) this.comments.push(comment._id)
    this.save()
}

ArticleSchema.methods.removeComment = function(comment) {
    let index = this.comments.indexOf(comment._id)
    if(index !== -1) this.comments.splice(index, 1)
    this.save()
}

ArticleSchema.methods.updateFavoritesCount = function() {
    return User.countDocuments({favorites: {$in: this._id}}).then(count=> {
        this.favoritesCount = count
        return this.save()
    })
}

mongoose.model('articles', ArticleSchema)