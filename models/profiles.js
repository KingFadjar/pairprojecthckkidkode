'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profiles extends Model {
    static associate(models) {
      // One-to-One relationship with Users
      this.belongsTo(models.Users, {
        foreignKey: 'UserId',
        as: 'user',
      });
    }
  }
  Profiles.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profiles',
  });
  return Profiles;
};
