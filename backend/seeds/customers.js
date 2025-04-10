const mongoose = require('mongoose');
const Customer = require('../models/customer');

const seedCustomers = async () => {
  await Customer.deleteMany({});

  const customerId = new mongoose.Types.ObjectId('66164b5fd1e7f5c8c1111111');

  const customer = new Customer({
    _id: customerId,
    fullName: 'Aki Hoshino',
    username: 'aki_hoshino007',
    password: 'aki_h007',
    email: 'aki.chan@example.com',
    phone: '0987654321',
    address: {
      houseNumber: "10A",
      street: "Lý Thường Kiệt",
      ward: "Phường 2",
      district: "Quận 1",
      city: "Hồ Chí Minh"
    },
    gender: 'Female'
  });

  await customer.save();
  console.log('💖 Seeded Customer');
};

module.exports = seedCustomers;