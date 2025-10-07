const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Upload middleware for product image
router.post('/upload', authMiddleware, productController.upload, productController.bulkUpload);

// Product CRUD routes
router.post('/', authMiddleware, productController.upload, productController.create);
router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.put('/:id', authMiddleware, productController.upload, productController.update);
router.delete('/:id', authMiddleware, productController.delete);

// Excel report
router.get('/report/download', authMiddleware, productController.generateReport);

module.exports = router;
