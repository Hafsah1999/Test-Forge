// routes/forms.js
const express = require('express');
const router = express.Router();
const Form = require('../Models/testModel'); // Assuming you have a Form model

router.post('/add', async (req, res) => {
  try {
    const { title, questions } = req.body;
    
    // Create a new form document
    const newForm = new Form({
      title,
      questions,
      createdAt: new Date(),
      // Add more fields as needed, e.g., createdBy: req.user._id
    });

    // Save the form to the database
    await newForm.save();

    res.status(201).json({ message: 'Form created successfully', formId: newForm._id });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ message: 'Error creating form' });
  }
});

module.exports = router;