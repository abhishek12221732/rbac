const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
connectDB();

const app = express();

// CORS configuration to allow requests from your Next.js frontend
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(express.json()); // to accept json data

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));