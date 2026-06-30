const mongoose = require('mongoose');

const rentalRequestSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productName: { type: String, required: true },
    rentalDuration: { type: Number, required: true },
    rentalUnit: { type: String, enum: ['day', 'week', 'month'], default: 'month' },
    startDate: { type: Date, required: true },
    deliveryAddress: { type: String, required: true },
    status: {
        type: String,
        enum: ['pending', 'approved', 'active', 'completed', 'rejected'],
        default: 'pending',
    },
    totalCost: { type: Number },
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('RentalRequest', rentalRequestSchema);
