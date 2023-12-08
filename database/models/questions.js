const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    content: { type: String, required: true },
    answers:[{ type: String, required: true }],
    correctAnswer: { type: Number, required: true },
}, { timestamps: true },
  { collection: 'Questions' }
)

const Question = mongoose.model('Question', Schema)
module.exports = Question;