const RentalRequest = require('../models/RentalRequest');
const Product = require('../models/Product');

// @desc Create rental request
// @route POST /api/rentals
const createRentalRequest = async (req, res) => {
    try {
        const product = await Product.findById(req.body.product);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        const durationMultiplier = req.body.rentalUnit === 'day' ? 1 :
            req.body.rentalUnit === 'week' ? 7 : 30;
        const totalCost = product.rentalPrice * req.body.rentalDuration * (durationMultiplier / 30);
        const rental = await RentalRequest.create({ ...req.body, productName: product.name, totalCost });
        res.status(201).json({ message: 'Rental request submitted successfully!', rental });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Get all rental requests (admin)
// @route GET /api/rentals
const getAllRentals = async (req, res) => {
    try {
        const rentals = await RentalRequest.find({}).populate('product', 'name images').sort({ createdAt: -1 });
        res.json(rentals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update rental status (admin)
// @route PUT /api/rentals/:id/status
const updateRentalStatus = async (req, res) => {
    try {
        const rental = await RentalRequest.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!rental) return res.status(404).json({ message: 'Rental request not found' });
        res.json(rental);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createRentalRequest, getAllRentals, updateRentalStatus };
