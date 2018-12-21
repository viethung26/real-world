const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

let CommentSchema = new Schema({
    body: {type: String, required: [true, "can't be blank"]},
    author: {type: ObjectId, ref: "users"},
    article: {type: ObjectId, ref: "articles"}
}, {timestamps: true})

CommentSchema.methods.toCommentJson = function(user) {
    return {
        id: this._id,
        body: this.body,
        author: this.author.toProfileJson(user),
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    }
}

mongoose.model("comments", CommentSchema)