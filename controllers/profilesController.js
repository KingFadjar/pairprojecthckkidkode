'use strict';

const { Profiles } = require('../models');

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profiles.findAll({
      include: 'user'
    });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profiles.findByPk(req.params.id, {
      include: 'user'
    });
    if (profile) {
      res.status(200).json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProfile = async (req, res) => {
  try {
    const profile = await Profiles.create(req.body);
    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const [updated] = await Profiles.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProfile = await Profiles.findByPk(req.params.id);
      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const deleted = await Profiles.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
