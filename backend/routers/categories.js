const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categories');
const Category = require('../models/category');
const filterDeleted = require('../middlewares/filterDeleted');

router.get('/', filterDeleted(Category), categoryController.getAllCategories);
router.get('/all', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryByIdOrSlug);
router.post('/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);  
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
