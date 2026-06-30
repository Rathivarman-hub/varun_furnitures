const express = require('express');
const router = express.Router();
const { getReviews, createReview, getAllReviews, approveReview, deleteReview } = require('../controllers/reviewController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getReviews);
router.post('/', createReview);
router.get('/admin', protect, adminOnly, getAllReviews);
router.put('/:id/approve', protect, adminOnly, approveReview);
router.delete('/:id', protect, adminOnly, deleteReview);

module.exports = router;
