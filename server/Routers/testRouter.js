// routes/forms.js
const express = require('express');
const router = express.Router();
const Form = require('../Models/testModel'); // Assuming you have a Form model

router.post('/add', async (req, res) => {
  const { title, questions, createdAt } = req.body;
  console.log(req.body);
  if (!title.trim()) {
    return res.status(400).json({ message: 'Form title is required' });
  }
  if (!questions || questions.length === 0) {
    return res.status(400).json({ message: 'At least one question is required' });
  }
  try {
    const newForm = new Form({ title, questions, createdAt });
    await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'An error occurred while submitting the form' });
  }
});

module.exports = router;