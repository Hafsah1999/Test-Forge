// routes/studentCredentials.js

const express = require('express');
const router = express.Router();
const StudentCredential = require('../models/studentModel');

// POST - Create new student credentials
router.post('/add', async (req, res) => {
  try {
    const newCredential = new StudentCredential(req.body);
    await newCredential.save();
    res.status(201).json(newCredential);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET - Retrieve student credentials by ID
router.get('/get/:id', async (req, res) => {
  try {
    const credential = await StudentCredential.findById(req.params.id);
    if (!credential) {
      return res.status(404).json({ message: 'Credential not found' });
    }
    res.json(credential);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET - Retrieve all student credentials
router.get('/getall', async (req, res) => {
  try {
    const credentials = await StudentCredential.find();
    res.json(credentials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Update student credentials
router.put('/update/:id', async (req, res) => {
  try {
    const updatedCredential = await StudentCredential.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCredential) {
      return res.status(404).json({ message: 'Credential not found' });
    }
    res.json(updatedCredential);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Delete student credentials
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedCredential = await StudentCredential.findByIdAndDelete(req.params.id);
    if (!deletedCredential) {
      return res.status(404).json({ message: 'Credential not found' });
    }
    res.json({ message: 'Credential deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;