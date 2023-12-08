const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    type: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
}, { timestamps: true },
  { collection: 'Likes' }
)

const Like = mongoose.model('Like', Schema)
module.exports = Like;