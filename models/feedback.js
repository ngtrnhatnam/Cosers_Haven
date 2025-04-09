const mongoose = require('mongoose');
const feedbackSchema = require('../schemas/feedback');
const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;