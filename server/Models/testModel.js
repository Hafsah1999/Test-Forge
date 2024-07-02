// models/Form.js

const { Schema, model } = require('../connection');

const FormSchema = new Schema({
  title: { type: String, required: true },
  questions: [{
    type: { type: String, required: true },
    text: { type: String, required: true },
    options: [String]
  }],
  createdAt: { type: Date, default: Date.now },
  // Add more fields as needed
});

module.exports = model('Form', FormSchema);