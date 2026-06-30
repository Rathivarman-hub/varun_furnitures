const Contact = require('../models/Contact');

// @desc Add contact message
// @route POST /api/contact
const createContact = async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json({ message: 'Message sent successfully!', contact });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Get all contact messages (admin)
// @route GET /api/contact/admin
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createContact, getAllContacts };
