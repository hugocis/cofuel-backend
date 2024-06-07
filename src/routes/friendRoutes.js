const express = require('express');
const { sendFriendRequest, respondFriendRequest, listFriends } = require('../controllers/friendController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, sendFriendRequest);
router.put('/:id', verifyToken, respondFriendRequest);
router.get('/:userId', verifyToken, listFriends);

module.exports = router;
