const Product = require('../models/Product');

// @desc Get all products
// @route GET /api/products
const getProducts = async (req, res) => {
    try {
        const { category, search, featured, page = 1, limit = 12 } = req.query;
        const query = {};
        if (category) query.category = category;
        if (featured) query.featured = featured === 'true';
        if (search) query.name = { $regex: search, $options: 'i' };

        const count = await Product.countDocuments(query);
        const products = await Product.find(query)
            .sort({ price: 1 })
            .skip((page - 1) * Number(limit))
            .limit(Number(limit));

        res.json({ products, count, pages: Math.ceil(count / limit), currentPage: Number(page) });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get single product
// @route GET /api/products/:id
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Create product
// @route POST /api/products
const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Update product
// @route PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Delete product
// @route DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get product categories
// @route GET /api/products/categories
const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct, getCategories };
