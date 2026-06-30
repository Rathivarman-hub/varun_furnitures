const Order = require('../models/Order');

// @desc Create order
// @route POST /api/orders
const createOrder = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Get all orders (admin)
// @route GET /api/orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email').sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Get single order
// @route GET /api/orders/:id
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('user', 'name email');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc Update order status
// @route PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        order.orderStatus = req.body.orderStatus || order.orderStatus;
        order.paymentStatus = req.body.paymentStatus || order.paymentStatus;
        const updated = await order.save();
        res.json(updated);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createOrder, getAllOrders, getOrderById, updateOrderStatus };
