'use strict';

const { Categories } = require('../models');

class CategoryController {
    static async getAllCategories(req, res) {
        try {
            const categories = await Categories.findAll();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCategoryById(req, res) {
        try {
            const category = await Categories.findByPk(req.params.id, {
                include: 'courses'
            });
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async createCategory(req, res) {
        try {

            const category = await Categories.create(req.body);

            res.status(201).json(category);
            res.render('add', { category })

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCategory(req, res) {
        try {
            const [updated] = await Categories.update(req.body, {
                where: { id: req.params.id }
            });
            if (updated) {
                const updatedCategory = await Categories.findByPk(req.params.id);
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async deleteCategory(req, res) {
        try {
            const deleted = await Categories.destroy({
                where: { id: req.params.id }
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Category not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CategoryController;
