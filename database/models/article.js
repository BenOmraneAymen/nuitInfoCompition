const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    //author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    author: { type: String },
}, { timestamps: true },
  { collection: 'Articles' }
)

const article = mongoose.model('Article', Schema)
module.exports = article;