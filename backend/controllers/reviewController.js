const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc Get all approved reviews
// @route GET /api/reviews
const getReviews = async (req, res) => {
    try {
        const { product, general } = req.query;
        const query = { isApproved: true };
        if (product) query.product = product;
        if (general === 'true') query.isGeneral = true;
        const reviews = await Review.find(query).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Add review
// @route POST /api/reviews
const createReview = async (req, res) => {
    try {
        // Automatically approve reviews for live updates as requested by user
        const reviewData = { ...req.body, isApproved: true };
        const review = await Review.create(reviewData);
        
        // Update product rating if product-specific
        if (review.product) {
            const reviews = await Review.find({ product: review.product, isApproved: true });
            const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
            await Product.findByIdAndUpdate(review.product, { rating: avgRating.toFixed(1), numReviews: reviews.length });
        }

        // Emit new review to all connected clients
        const io = req.app.get('io');
        if (io) {
            io.emit('new-review', review);
        }

        res.status(201).json({ message: 'Review submitted successfully!', review });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


// @desc Get all reviews (admin)
// @route GET /api/reviews/admin
const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({}).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Approve/reject review (admin)
// @route PUT /api/reviews/:id/approve
const approveReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { isApproved: req.body.isApproved },
            { new: true }
        );
        if (!review) return res.status(404).json({ message: 'Review not found' });
        res.json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Delete review
// @route DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.json({ message: 'Review removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReviews, createReview, getAllReviews, approveReview, deleteReview };
