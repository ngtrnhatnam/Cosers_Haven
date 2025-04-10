const mongoose = require('mongoose');
const paymentSchema = require('../schemas/payment');
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;