const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    isRental: { type: Boolean, default: false },
    rentalDuration: { type: Number },
    rentalUnit: { type: String, enum: ['day', 'week', 'month'], default: 'month' },
    image: { type: String },
});

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    deliveryAddress: { type: String, required: true },
    orderItems: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: {
        type: String,
        enum: ['pending', 'confirmed', 'processing', 'delivered', 'cancelled'],
        default: 'pending',
    },
    orderType: { type: String, enum: ['purchase', 'rental'], default: 'purchase' },
    notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
