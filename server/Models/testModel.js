// models/Form.js

const { Schema, model } = require('../connection');

const optionSchema = new Schema({
  value: { type: String, required: true }
});

const questionSchema = new Schema({
  type: { type: String, required: true, enum: ['short', 'paragraph', 'multiple'] },
  options: [optionSchema]
});

const testSchema = new Schema({
  title: { type: String, required: true },
  questions: [questionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('test', testSchema);