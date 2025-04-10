const mongoose = require('mongoose');
const Cart = require('../models/cart');

const seedCarts = async () => {
  const carts = [
    {
      _id: new mongoose.Types.ObjectId('6616facec0ffee1122334455'),
      customerID: '66164b5fd1e7f5c8c1111111', // ID khách cố định
      items: [
        {
          costumeID: '6616fab4c3ab5a3f405e7ccc', // Nezuko
          quantity: 2
        },
        {
          costumeID: '6616fac3c3ab5a3f405e7ccd', // Ahri KDA
          quantity: 1
        }
      ],
      status: 'Pending'
    }
  ];

  try {
    await Cart.deleteMany();
    await Cart.insertMany(carts);
    console.log('✅ Seeded Carts!');
  } catch (err) {
    console.error('❌ Failed to seed Carts:', err.message);
  }
};

module.exports = seedCarts;