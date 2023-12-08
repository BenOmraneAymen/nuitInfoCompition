const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
   content: { type: String, required: true },
}, { timestamps: true },
  { collection: 'Tips' }
)

const Tip = mongoose.model('Tip', Schema)
module.exports = Tip;
