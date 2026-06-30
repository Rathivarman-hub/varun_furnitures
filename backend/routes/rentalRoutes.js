const express = require('express');
const router = express.Router();
const { createRentalRequest, getAllRentals, updateRentalStatus } = require('../controllers/rentalController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', createRentalRequest);
router.get('/', protect, adminOnly, getAllRentals);
router.put('/:id/status', protect, adminOnly, updateRentalStatus);

module.exports = router;
