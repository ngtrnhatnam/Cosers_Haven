const bcrypt = require('bcrypt');
const AdminAccount = require('../models/adminAccount');

const seedAdminAccounts = async () => {
  await AdminAccount.deleteMany({});

  const password = await bcrypt.hash('admin123', 10);

  const admin = new AdminAccount({
    username: 'admin1',
    password,
    email: 'admin1@example.com',
    phone: '0123456789',
    fullName: 'Quản Trị Viên',
    role: 'Admin'
  });

  await admin.save();
  console.log('✅ Seeded Admin Account');
};

module.exports = seedAdminAccounts;