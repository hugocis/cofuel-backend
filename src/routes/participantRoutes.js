const express = require('express');
const { addParticipant, respondToParticipationRequest, listParticipants } = require('../controllers/participantController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', verifyToken, addParticipant);
router.put('/:id', verifyToken, respondToParticipationRequest);
router.get('/:tripId', verifyToken, listParticipants);

module.exports = router;
