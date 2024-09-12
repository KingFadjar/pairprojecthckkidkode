'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs')
const { hashPass } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
    static async postLogin(req, res) {
      return await this.findOne({ where: { username } });
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }), {
    hooks: {
      beforeCreate: async (instance, options) => {
        instance.password = await hashPass(instance.password) 
      },
    sequelize,
    modelName: 'User',
  }}
  return User;
};