const express = require('express');
const router = express.Router();
const { createOrder, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', createOrder);
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
