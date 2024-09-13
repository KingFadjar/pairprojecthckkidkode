'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');
const { hashPass } = require('../helper/hash');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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

    // Tambahkan metode untuk memverifikasi password
    verifyPassword(password) {
      return bcrypt.compare(password, this.password);
    }
  }

  // Menggunakan `Users.init` sesuai dengan nama kelas
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Username harus diisi',
          },
          len: {
            args: [3, 25],
            msg: 'Username harus di antara 3 hingga 25 karakter',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Email sudah digunakan',
        },
        validate: {
          isEmail: {
            msg: 'Format email tidak valid',
          },
          notEmpty: {
            msg: 'Email harus diisi',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password harus diisi',
          },
          len: {
            args: [6, 100],
            msg: 'Password minimal 6 karakter',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Role harus diisi',
          },
          isIn: {
            args: [['admin', 'user']],
            msg: 'Role harus admin atau user',
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: async (instance, options) => {
          // Hash password sebelum menyimpan ke database
          if (instance.password) {
            instance.password = await hashPass(instance.password);
          }
        },
        beforeUpdate: async (instance, options) => {
          // Hash password sebelum memperbarui di database jika diubah
          if (instance.changed('password')) {
            instance.password = await hashPass(instance.password);
          }
        },
      },
      sequelize,
      modelName: 'User'   // Menambahkan createdAt dan updatedAt secara otomatis
    }
  )

  return User // Mengembalikan model Users yang benar
};
