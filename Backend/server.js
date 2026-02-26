const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const authRoutes = require('./routes/authRoutes');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true
}));
app.use(cookieParser());

// Init Database
User.createTable()
    .then(() => console.log('Database table initialized'))
    .catch(err => console.error('Error initializing database:', err));

// Routes
app.use('/api', authRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', database: 'connected' });
});

// Catch-all for 404s
app.use((req, res) => {
    console.log(`[${new Date().toISOString()}] 404 - Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});
