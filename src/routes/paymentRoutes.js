const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, paymentController.createPayment);
router.get('/', authMiddleware, paymentController.getAllPayments);
router.get('/trip/:trip_id', authMiddleware, paymentController.getPaymentsByTripId);
router.delete('/:payment_id', authMiddleware, paymentController.deletePayment);

module.exports = router;
