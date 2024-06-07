const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, vehicleController.addVehicle);
router.get('/:userId', authMiddleware, vehicleController.listVehicles);
router.put('/:userId/:licensePlate', authMiddleware, vehicleController.updateVehicle);
router.delete('/:userId/:licensePlate', authMiddleware, vehicleController.deleteVehicle);

module.exports = router;
