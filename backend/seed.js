require('dotenv').config(); // Load biến môi trường từ .env
const mongoose = require('mongoose');
const uri = process.env.DB_URI;

const seedCostumes = require('./seeds/costumes');
const seedCustomers = require('./seeds/customers');
const seedCategories = require('./seeds/categories');
const seedRentals = require('./seeds/rentals');
const seedPayments = require('./seeds/payments');
const seedCarts = require('./seeds/carts');
const seedAdminAccounts = require('./seeds/adminAccounts');

const connectDB = async () => {
    try {
      await mongoose.connect(uri);
      console.log('✅ Connected to MongoDB!');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err.message);
      process.exit(1);
    }
  };

const runAllSeeds = async () => {
  try {
    await connectDB(); // gọi kết nối ở đây
    console.log('🚀 Seeding started...');

    await seedCategories();
    await seedCostumes();
    await seedCustomers();
    await seedRentals();
    await seedPayments();
    await seedCarts();
    await seedAdminAccounts();

    console.log('🎉 All seed data inserted!');
    process.exit(); // ✅ thoát sau khi xong
  } catch (err) {
    console.error('❌ Failed to seed:', err);
    process.exit(1);
  }
};

runAllSeeds();
