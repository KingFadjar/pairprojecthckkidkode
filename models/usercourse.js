'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    static associate(models) {
      // Many-to-Many relationships
      this.belongsTo(models.Users, {
        foreignKey: 'UserId',
        as: 'user',
      });

      this.belongsTo(models.Courses, {
        foreignKey: 'CourseId',
        as: 'course',
      });
    }
  }
  UserCourse.init({}, {
    sequelize,
    modelName: 'UserCourse',
  });
  return UserCourse;
};
