// src/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, paymentController.createPayment);
router.get('/', authMiddleware, paymentController.getPayments);
router.get('/trip/:trip_id', authMiddleware, paymentController.getPaymentsByTrip);
router.delete('/:payment_id', authMiddleware, paymentController.deletePayment);

module.exports = router;
