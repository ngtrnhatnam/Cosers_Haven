var createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
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

const customerRouter = require('./routers/customers');
const costumeRouter = require('./routers/costumes');
const categoryRouter = require('./routers/categories');
const paymentRouter = require('./routers/payments');
const adminAccountRouter = require('./routers/adminAccounts');
const rentalRouter = require('./routers/rentals');
const cartRouter = require('./routers/carts');

app.use('/api/customers', customerRouter);
app.use('/api/costumes', costumeRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/payments', paymentRouter);
app.use('/api/admin_accounts', adminAccountRouter);
app.use('/api/rentals', rentalRouter);
app.use('/api/carts', cartRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

module.exports = app;