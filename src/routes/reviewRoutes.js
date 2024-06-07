const express = require('express');
const { addReview, listReviews } = require('../controllers/reviewController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addReview);
router.get('/:tripId', verifyToken, listReviews);

module.exports = router;
