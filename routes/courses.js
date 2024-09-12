const express = require('express');
const router = express.Router();
const { Courses, Categories, Users } = require('../models');

// CREATE Course
router.post('/', async (req, res) => {
  try {
    const course = await Courses.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ All Courses
router.get('/', async (req, res) => {
  try {
    const courses = await Courses.findAll({
      include: [{ model: Categories, as: 'category' }, { model: Users, as: 'users' }]
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ Single Course
router.get('/:id', async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params.id, {
      include: [{ model: Categories, as: 'category' }, { model: Users, as: 'users' }]
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Course
router.put('/:id', async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params.id);
    if (course) {
      await course.update(req.body);
      res.json(course);
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Course
router.delete('/:id', async (req, res) => {
  try {
    const course = await Courses.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ error: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
