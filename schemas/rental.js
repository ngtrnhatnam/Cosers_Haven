const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    rentalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental',
        required: false
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date
    },
    deleteReason: {
        type: String,
        default: ''
    }
});

module.exports = feedbackSchema