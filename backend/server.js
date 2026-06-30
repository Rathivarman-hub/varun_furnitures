const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { createServer } = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173',
    'http://localhost:5174'
].filter(Boolean);

const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Expose io to routes
app.set('io', io);

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Socket connection
io.on('connection', (socket) => {
    console.log('🔌 Client connected:', socket.id);
    socket.on('disconnect', () => console.log('👋 Client disconnected:', socket.id));
});

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/rentals', require('./routes/rentalRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));


// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Varun Furniture API is running ✅', timestamp: new Date() });
});

// Error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({ message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

