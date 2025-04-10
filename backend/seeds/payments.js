const mongoose = require('mongoose');
const Payment = require('../models/payment');

const seedPayments = async () => {
  const payments = [
    {
      _id: new mongoose.Types.ObjectId('6616fabc1234567890abcdef'), // ID cố định
      customerID: '6616fabc1234567890aaaaaa', // ID khách hàng cố định
      rentalID: '6616fabc1234567890bbbbbb', // ID rental cố định
      amount: 300000,
      method: 'momo',
      status: 'completed',
    },
    {
      _id: new mongoose.Types.ObjectId('6616fabc1234567890abcdee'),
      customerID: '6616fabc1234567890aaaaaa',
      rentalID: '6616fabc1234567890cccccc',
      amount: 450000,
      method: 'banking',
      status: 'pending',
    }
  ];

  try {
    await Payment.deleteMany(); // Xóa sạch payment cũ
    await Payment.insertMany(payments); // Insert payment mới
    console.log('✅ Seeded Payments!');
  } catch (err) {
    console.error('❌ Failed to seed Payments:', err.message);
  }
};

module.exports = seedPayments;