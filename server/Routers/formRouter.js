const express = require('express');
const router = express.Router();
const Form = require('../Models/formModel');

// Add a new form
router.post('/add', async (req, res) => {
  const { title, questions, createdAt } = req.body;
  console.log(req.body);
  try {
    const newForm = new Form({ title, questions, createdAt });
    const data = await newForm.save();
    res.status(201).json(data);
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
router.get('/getall', async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ message: 'An error occurred while fetching the forms' });
  }
});

// Get a specific form
router.get('/getbyid/:id', async (req, res) => {
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



router.put('/getbyid/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    form.title = req.body.title || form.title;
    form.questions = req.body.questions || form.questions;
    const updatedForm = await form.save();
    res.json(updatedForm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    await form.remove();
    res.json({ message: 'Form deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the form by ID and update it
    const updatedForm = await Form.findByIdAndUpdate(id, updateData, {
      new: true, // This option returns the updated document
      runValidators: true // This ensures that any mongoose validations are run on the updated data
    });

    if (!updatedForm) {
      return res.status(404).json({ message: 'Form not found' });
    }

    res.status(200).json(updatedForm);
  } catch (error) {
    console.error('Error updating form:', error);
    res.status(500).json({ message: 'An error occurred while updating the form', error: error.message });
  }
});

module.exports = router;
