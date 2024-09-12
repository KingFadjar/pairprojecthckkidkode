'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relasi One-to-Many dengan tabel Courses
      Categories.hasMany(models.Courses, {
        foreignKey: 'CategoryId', // Foreign key yang menghubungkan dengan tabel Courses
        as: 'courses', // Alias untuk asosiasi ini
        onDelete: 'SET NULL', // Mengatur aksi ketika kategori dihapus
        onUpdate: 'CASCADE'    // Mengatur aksi ketika kategori diperbarui
      });
    }
  }

  Categories.init({
    name: DataTypes.STRING // Sesuaikan dengan struktur database yang benar
  }, {
    sequelize,
    modelName: 'Categories',
  });

  return Categories;
};
