const mongoose = require('mongoose');
const customerSchema = require('../schemas/customer');
const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;