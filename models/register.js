'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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

  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure that each username is unique
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure that each email is unique
        validate: {
          isEmail: true, // Validate that the email format is correct
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Users',
      hooks: {
        beforeCreate: async (user, options) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10); // Hash password before saving to database
          }
        },
        beforeUpdate: async (user, options) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10); // Hash password before updating in database
          }
        },
      },
    }
  );

  return Users;
};
