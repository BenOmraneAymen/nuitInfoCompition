const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
}, { timestamps: true },
  { collection: 'Comments' }
)

const Comment = mongoose.model('Comment', Schema)
module.exports = Comment;