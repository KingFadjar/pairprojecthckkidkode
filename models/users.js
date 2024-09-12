'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // One-to-One relationship with Profiles
      this.hasOne(models.Profiles, {
        foreignKey: 'UserId',
        as: 'profile',
      });

      // Many-to-Many relationship with Courses through UserCourse
      this.belongsToMany(models.Courses, {
        through: models.UserCourse,
        foreignKey: 'UserId',
        as: 'courses',
      });
    }
  }

  // Menggunakan `Users.init` sesuai dengan nama kelas
  Users.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: async (instance, options) => {
          instance.password = await hashPass(instance.password); // Pastikan hashPass didefinisikan dan diimpor dengan benar
        },
      },
      sequelize,
      modelName: 'Users',
    }
  );

  return Users;
};
