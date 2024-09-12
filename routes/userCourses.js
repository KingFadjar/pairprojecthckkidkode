const express = require('express');
const router = express.Router();
const { UserCourse, Users, Courses } = require('../models'); // Sesuaikan path dengan struktur proyek Anda

// CREATE UserCourse
router.post('/', async (req, res) => {
  try {
    const userCourse = await UserCourse.create(req.body);
    res.status(201).json(userCourse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ All UserCourses
router.get('/', async (req, res) => {
  try {
    const userCourses = await UserCourse.findAll({
      include: [{ model: Users, as: 'user' }, { model: Courses, as: 'course' }]
    });
    res.json(userCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ Single UserCourse
router.get('/:id', async (req, res) => {
  try {
    const userCourse = await UserCourse.findByPk(req.params.id, {
      include: [{ model: Users, as: 'user' }, { model: Courses, as: 'course' }]
    });
    if (userCourse) {
      res.json(userCourse);
    } else {
      res.status(404).json({ error: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE UserCourse
router.delete('/:id', async (req, res) => {
  try {
    const userCourse = await UserCourse.findByPk(req.params.id);
    if (userCourse) {
      await userCourse.destroy();
      res.json({ message: 'UserCourse deleted' });
    } else {
      res.status(404).json({ error: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
