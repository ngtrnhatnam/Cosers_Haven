const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  items: [
    {
      costumeID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Costume',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]
}, { timestamps: true });

module.exports = cartSchema;