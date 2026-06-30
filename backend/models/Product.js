const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    category: {
        type: String,
        required: true,
        enum: ['Sofa', 'Cart', 'Dining Tables', 'Chairs', 'Cupboards', 'Office Furniture', 'Pooja Stand', 'Mattresses', 'TV Units', 'Dressing Tables', 'Tea Tables', 'Other'],
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    material: { type: String },
    dimensions: { type: String },
    color: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
