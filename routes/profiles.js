const express = require('express');
const router = express.Router();
const { Profiles, Users } = require('../models'); // Sesuaikan path dengan struktur proyek Anda

// CREATE Profile
router.post('/', async (req, res) => {
  try {
    const profile = await Profiles.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ All Profiles
router.get('/', async (req, res) => {
  try {
    const profiles = await Profiles.findAll({
      include: [{ model: Users, as: 'user' }]
    });
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// READ Single Profile
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profiles.findByPk(req.params.id, {
      include: [{ model: Users, as: 'user' }]
    });
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE Profile
router.put('/:id', async (req, res) => {
  try {
    const profile = await Profiles.findByPk(req.params.id);
    if (profile) {
      await profile.update(req.body);
      res.json(profile);
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE Profile
router.delete('/:id', async (req, res) => {
  try {
    const profile = await Profiles.findByPk(req.params.id);
    if (profile) {
      await profile.destroy();
      res.json({ message: 'Profile deleted' });
    } else {
      res.status(404).json({ error: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
