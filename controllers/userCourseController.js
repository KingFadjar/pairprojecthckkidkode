'use strict';

const { UserCourse } = require('../models');

exports.getAllUserCourses = async (req, res) => {
  try {
    const userCourses = await UserCourse.findAll({
      include: ['user', 'course']
    });
    res.status(200).json(userCourses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserCourseById = async (req, res) => {
  try {
    const userCourse = await UserCourse.findByPk(req.params.id, {
      include: ['user', 'course']
    });
    if (userCourse) {
      res.status(200).json(userCourse);
    } else {
      res.status(404).json({ message: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUserCourse = async (req, res) => {
  try {
    const userCourse = await UserCourse.create(req.body);
    res.status(201).json(userCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserCourse = async (req, res) => {
  try {
    const [updated] = await UserCourse.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUserCourse = await UserCourse.findByPk(req.params.id);
      res.status(200).json(updatedUserCourse);
    } else {
      res.status(404).json({ message: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUserCourse = async (req, res) => {
  try {
    const deleted = await UserCourse.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'UserCourse not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
