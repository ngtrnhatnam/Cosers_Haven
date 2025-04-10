const mongoose = require('mongoose');
const costumeSchema = require('../schemas/costume');
const Costume = mongoose.model('Costume', costumeSchema);

module.exports = Costume;