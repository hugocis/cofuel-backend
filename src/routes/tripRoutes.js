const express = require('express');
const { createTrip, listTrips, getTripDetails } = require('../controllers/tripController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, createTrip);
router.get('/', verifyToken, listTrips);
router.get('/:id', verifyToken, getTripDetails);

module.exports = router;
