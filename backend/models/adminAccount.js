const mongoose = require('mongoose');
const adminAccountSchema = require('../schemas/adminAccount');
const adminAccount = mongoose.model('Admin Account', adminAccountSchema);

module.exports = adminAccount;