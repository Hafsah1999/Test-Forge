const express = require('express');
const router = express.Router();
const Form = require('../Models/formModel');

// Add a new form
router.post('/add', async (req, res) => {
  const { title, questions, createdAt } = req.body;
  console.log(req.body);
  try {
    const newForm = new Form({ title, questions, createdAt });
    await newForm.save();
    res.status(201).json({ message: 'Form created successfully' });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ message: 'An error occurred while creating the form' });
  }
});

// Submit a response
router.post('/submit/:id', async (req, res) => {
  const formId = req.params.id;
  const { responses } = req.body;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    form.responses.push(...responses);
    await form.save();
    res.status(200).json({ message: 'Responses submitted successfully' });
  } catch (error) {
    console.error('Error submitting responses:', error);
    res.status(500).json({ message: 'An error occurred while submitting the responses' });
  }
});

// Get all forms
router.get('/', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'An error occurred while fetching the forms' });
  }
});

// Get a specific form
router.get('/:id', async (req, res) => {
  const formId = req.params.id;
  try {
    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(200).json(form);
  } catch (error) {
    console.error('Error fetching form:', error);
    res.status(500).json({ message: 'An error occurred while fetching the form' });
  }
});

module.exports = router;
