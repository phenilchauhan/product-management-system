const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');

// User authentication
router.post('/register', userController.register);
router.post('/login', userController.login);

// Protected routes (JWT required)
router.get('/', authMiddleware, userController.getUsers);
// You can add more user-specific CRUD routes if needed
// e.g., get by ID, update, delete

// Example:
// router.get('/:id', authMiddleware, userController.getUserById);
// router.put('/:id', authMiddleware, userController.updateUser);
// router.delete('/:id', authMiddleware, userController.deleteUser);

module.exports = router;
