var createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Kết nối MongoDB
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('📦 MongoDB connected!'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Route mẫu
const customerRouter = require('./routers/customers');
const costumeRouter = require('./routers/costumes');
const categoryRouter = require('./routers/categories');
const feedbackRouter = require('./routers/feedbacks');
const paymentRouter = require('./routers/payments');

app.use('/api/customers', customerRouter);
app.use('/api/costumes', costumeRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/payments', paymentRouter);

module.exports = app;