// schemas/Rental.js
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  items: [
    {
      costumeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Costume',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
      pricePerDay: {
        type: Number,
        required: true,
      },
      feedback: { // Thêm feedback cho từng costumeID
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          default: '',
        },
        createdAt: {
          type: Date,
        },
      },
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'returned', 'cancelled'],
    default: 'pending',
  },
  rentalDate: {
    type: Date,
    default: Date.now,
  },
  returnDate: {
    type: Date,
  },
  message: {
    type: String,
    default: '',
    required: false,
  },
  transactionId: {
    type: String,
  },
  deleteInfo: {
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
    deleteReason: { type: String, default: '' },
    restoreAt: { type: Date },
  },
  adminNote: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = rentalSchema;