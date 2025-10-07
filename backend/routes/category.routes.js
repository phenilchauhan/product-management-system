const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware, categoryController.createCategory);
router.get('/', categoryController.getCategories);

module.exports = router;
