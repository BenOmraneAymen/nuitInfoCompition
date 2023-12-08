const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
}, { timestamps: true },
  { collection: 'Quizs' }
)

const Quizz= mongoose.model('Quizz', Schema)
module.exports = Quizz;