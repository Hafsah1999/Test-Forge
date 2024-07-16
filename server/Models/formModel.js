const { Schema, model } = require('../connection');


const submissionSchema = new Schema({
  studentId: { type: Schema.Types.ObjectId, ref: 'student', required: true },
  formId: { type: Schema.Types.ObjectId, ref: 'form', required: true },
  answers: { type: Map, of: String },
  submittedAt: { type: Date, default: Date.now },
});

const questionSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['short', 'paragraph', 'multiple'] },
  options: [String]
});

const formSchema = new Schema({
  title: { type: String, required: true },
  duration:Number,
  status:String,
  questions: [questionSchema],
  responses: [submissionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('Form', formSchema)
