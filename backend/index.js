const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'https://rbac-yta0.onrender.com'], // Fontend URL
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));

app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));