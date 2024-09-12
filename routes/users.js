const express = require('express');
const router = express.Router();
const { Users, Profiles, Courses } = require('../models'); // Sesuaikan path dengan struktur proyek Anda

// CREATE User
router.post('/', async (req, res) => {
  try {
    const user = await Users.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ All Users
router.get('/', async (req, res) => {
  try {
    const users = await Users.findAll({
      include: [{ model: Profiles, as: 'profile' }, { model: Courses, as: 'courses' }]
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ Single User
router.get('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id, {
      include: [{ model: Profiles, as: 'profile' }, { model: Courses, as: 'courses' }]
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE User
router.put('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE User
router.delete('/:id', async (req, res) => {
  try {
    const user = await Users.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
