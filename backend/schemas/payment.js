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
    address: {
        houseNumber: {type: String},
        street: { type: String },
        ward: { type: String},
        district: {type: String},
        city: { type: String }
    },
    deleteInfo: {
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
        deleteReason: {
            type: String,
            default: ''
        },
        restoreAt: {
            type: Date, 
            default: null
        },
    },
}, { timestamps: true });

module.exports = paymentSchema
