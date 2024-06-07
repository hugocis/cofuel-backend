const express = require('express');
const { register, login, logout } = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/protected', verifyToken, (req, res) => {
  res.status(200).send('This is a protected route');
});

module.exports = router;
