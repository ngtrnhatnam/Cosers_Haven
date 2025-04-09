const mongoose = require('mongoose');
const rentalSchema = require('../schemas/rental');
const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;