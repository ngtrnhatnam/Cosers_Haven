const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    costumeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Costume',
        required: false // Có thể feedback về dịch vụ chung, không nhất thiết về costume
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        default: ''
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

module.exports = feedbackSchema;
