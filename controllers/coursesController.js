'use strict';

const { Courses } = require('../models');
class CourseController {
  static async getAllCourses(req, res) {
    try {
      const courses = await Courses.findAll({
        include: ['category', 'users']
      });
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getCourseById(req, res) {
    try {
      const course = await Courses.findByPk(req.params.id, {
        include: ['category', 'users']
      });
      if (course) {
        res.status(200).json(course);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createCourse(req, res) {
    try {
      const course = await Courses.create(req.body);
      res.status(201).json(course);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateCourse(req, res) {
    try {
      const [updated] = await Courses.update(req.body, {
        where: { id: req.params.id }
      });
      if (updated) {
        const updatedCourse = await Courses.findByPk(req.params.id);
        res.status(200).json(updatedCourse);
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteCourse(req, res) {
    try {
      const deleted = await Courses.destroy({
        where: { id: req.params.id }
      });
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Course not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports=CourseController;
