const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    rentalID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental', // giả sử có model Rental để lưu thông tin thuê
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    method: {
        type: String,
        enum: ['cash', 'banking', 'momo', 'zalopay', 'paypal'],
        default: 'cash'
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
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

module.exports = paymentSchema
