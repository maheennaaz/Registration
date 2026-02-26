const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.use((req, res, next) => {
    console.log(`[AuthRouter] ${req.method} ${req.url}`);
    next();
});

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
