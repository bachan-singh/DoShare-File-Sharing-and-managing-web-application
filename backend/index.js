// app.js

const express = require('express');
require('./config/db');
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoute')
const fileRoutes = require('./routes/FileRouter');
const mailRoutes = require('./routes/mailRoute');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Routes
app.use('/', userRoutes);
app.use('/', feedbackRoutes);
app.use('/', fileRoutes);
app.use('/', mailRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
