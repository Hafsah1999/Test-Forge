const express = require('express');
const router = express.Router();
const Form = require('../Models/formModel');

// Add a new form
router.post('/add', (req, res) => {
  const { title, questions, createdAt } = req.body;
  console.log(req.body);
  const newForm = new Form({ title, questions, createdAt });
  newForm.save()
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'An error occurred while creating the form' });
    });
});

// Submit a response
router.post('/submit/:id', (req, res) => {
  const formId = req.params.id;
  const { responses } = req.body;
  Form.findById(formId)
    .then(form => {
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      form.responses.push(...responses);
      return form.save();
    })
    .then(() => {
      res.status(200).json({ message: 'Responses submitted successfully' });
    })
    .catch(error => {
      console.error('Error submitting responses:', error);
      res.status(500).json({ message: 'An error occurred while submitting the responses' });
    });
});

// Get all forms
router.get('/getall', (req, res) => {
  Form.find()
    .then(forms => {
      res.status(200).json(forms);
    })
    .catch(error => {
      console.error('Error fetching forms:', error);
      res.status(500).json({ message: 'An error occurred while fetching the forms' });
    });
});

// Get a specific form
router.get('/getbyid/:id', (req, res) => {
  const formId = req.params.id;
  Form.findById(formId)
    .then(form => {
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.status(200).json(form);
    })
    .catch(error => {
      console.error('Error fetching form:', error);
      res.status(500).json({ message: 'An error occurred while fetching the form' });
    });
});

router.put('/getbyid/:id', (req, res) => {
  Form.findById(req.params.id)
    .then(form => {
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      form.title = req.body.title || form.title;
      form.questions = req.body.questions || form.questions;
      return form.save();
    })
    .then(updatedForm => {
      res.json(updatedForm);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.delete('/delete/:id', (req, res) => {
  Form.findByIdAndDelete(req.params.id)
    .then(form => {
      if (!form) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.json({ message: 'Form deleted' });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  Form.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true
  })
    .then(updatedForm => {
      if (!updatedForm) {
        return res.status(404).json({ message: 'Form not found' });
      }
      res.status(200).json(updatedForm);
    })
    .catch(error => {
      console.error('Error updating form:', error);
      res.status(500).json({ message: 'An error occurred while updating the form', error: error.message });
    });
});

router.get('/getActive', (req, res) => {
  Form.findOne({ status: 'published' })
    .then(test => {
      if (!test) {
        return res.status(404).json({ message: 'No active test found' });
      }
      res.json(test);
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
});

router.put('/updateStatus/:id', (req, res) => {
  Form.findById(req.params.id)
    .then(test => {
      if (!test) {
        return res.status(404).json({ message: 'Test not found' });
      }
      test.status = req.body.status;
      return test.save();
    })
    .then(updatedTest => {
      res.json(updatedTest);
    })
    .catch(error => {
      res.status(400).json({ message: error.message });
    });
});

module.exports = router;