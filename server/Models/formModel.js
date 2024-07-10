const { Schema, model } = require('../connection');


const responseSchema = new Schema({
  questionId: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  answer: { type: String, required: true },
  score: { type: Number, required: true }
});

const questionSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['short', 'paragraph', 'multiple'] },
  options: [String]
});

const formSchema = new Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  responses: [responseSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Form', formSchema)
