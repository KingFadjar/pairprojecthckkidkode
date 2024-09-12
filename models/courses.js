'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi One-to-Many dengan Categories
      Courses.belongsTo(models.Categories, {
        foreignKey: 'CategoryId',
        as: 'category', // Alias untuk relasi
        onDelete: 'SET NULL',  // Mengatur aksi jika kategori dihapus
        onUpdate: 'CASCADE'    // Mengatur aksi jika kategori diperbarui
      });

      // Relasi Many-to-Many dengan Users melalui UserCourse
      Courses.belongsToMany(models.Users, {
        through: models.UserCourse, // Tabel pivot
        foreignKey: 'CourseId',
        otherKey: 'UserId',
        as: 'users'  // Alias untuk relasi Many-to-Many
      });
    }
  }

  Courses.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Courses',
  });

  return Courses;
};
