const express = require('express');
const { getNotifications, markNotificationAsRead } = require('../controllers/notificationController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:userId', verifyToken, getNotifications);
router.put('/:id', verifyToken, markNotificationAsRead);

module.exports = router;
