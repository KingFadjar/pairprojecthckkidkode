const express = require('express');
const router = express.Router();
const { Categories, Courses } = require('../models'); // Sesuaikan path dengan struktur proyek Anda

// CREATE Category
router.post('/', async (req, res) => {
  try {
    const category = await Categories.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ All Categories
router.get('/', async (req, res) => {
  try {
    const categories = await Categories.findAll({
      include: [{ model: Courses, as: 'courses' }]
    });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ Single Category
router.get('/:id', async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id, {
      include: [{ model: Courses, as: 'courses' }]
    });
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Category
router.put('/:id', async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
    if (category) {
      await category.update(req.body);
      res.json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Category
router.delete('/:id', async (req, res) => {
  try {
    const category = await Categories.findByPk(req.params.id);
    if (category) {
      await category.destroy();
      res.json({ message: 'Category deleted' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
