// seeds/rentals.js
const mongoose = require('mongoose');
const Rental = require('../models/rental'); // Đường dẫn tới model Rental

const seedRentals = async () => {
  await Rental.deleteMany({});
  console.log('🗑️ Đã xóa dữ liệu Rental cũ');

  const customerId1 = new mongoose.Types.ObjectId('66164b5fd1e7f5c8c1111111'); // Từ seedCustomers
  const customerId2 = new mongoose.Types.ObjectId('66164b5fd1e7f5c8c2222222'); // Giả định khách khác
  const costumeId1 = new mongoose.Types.ObjectId('6616fab4c3ab5a3f405e7ccc'); // Nezuko Kimono
  const costumeId2 = new mongoose.Types.ObjectId('6616fac3c3ab5a3f405e7ccd'); // Ahri KDA

  const rental1 = new Rental({
    _id: new mongoose.Types.ObjectId('67f7ffd1e18a37a04364a2a3'), // ID cụ thể từ ví dụ
    customerID: customerId1,
    items: [
      {
        costumeID: costumeId1,
        quantity: 2,
        pricePerDay: 120000,
        _id: new mongoose.Types.ObjectId('67f7ffd1e18a37a04364a2a4'), // ID cụ thể
        feedback: {
          rating: 4,
          comment: 'Đẹp lắm, nhưng hơi chật ở vai',
          createdAt: new Date('2025-04-05'),
        },
      },
      {
        costumeID: costumeId2,
        quantity: 1,
        pricePerDay: 150000,
        _id: new mongoose.Types.ObjectId('67f7ffd1e18a37a04364a2a5'), // ID cụ thể
        feedback: {
          rating: 5,
          comment: 'Tuyệt vời, rất giống bản gốc!',
          createdAt: new Date('2025-04-06'),
        },
      },
    ],
    total: 390000,
    status: 'returned',
    rentalDate: new Date('2025-04-01T00:00:00.000Z'),
    returnDate: new Date('2025-04-07T00:00:00.000Z'),
    message: 'Giao hàng đúng giờ nha',
    transactionId: 'txn_123456',
    deleteInfo: {
      isDeleted: false,
      deleteReason: '',
      deletedAt: null, // Thêm để đầy đủ
      restoreAt: null, // Thêm để đầy đủ
    },
    adminNote: 'Khách VIP, ưu tiên xử lý',
    createdAt: new Date('2025-04-10T17:28:49.905Z'),
    updatedAt: new Date('2025-04-10T17:28:49.905Z'),
    __v: 0,
  });

  const rental2 = new Rental({
    _id: new mongoose.Types.ObjectId('67f7ffd1e18a37a04364a2b0'), // ID khác để không trùng
    customerID: customerId2,
    items: [
      {
        costumeID: costumeId1,
        quantity: 1,
        pricePerDay: 120000,
        _id: new mongoose.Types.ObjectId('67f7ffd1e18a37a04364a2b1'),
      },
    ],
    total: 120000,
    status: 'delivered',
    rentalDate: new Date('2025-04-08T00:00:00.000Z'),
    message: 'Gói cẩn thận giúp mình',
    transactionId: 'txn_789101',
    deleteInfo: {
      isDeleted: false,
      deleteReason: '',
      deletedAt: null,
      restoreAt: null,
    },
    adminNote: '',
    createdAt: new Date('2025-04-10T17:30:00.000Z'),
    updatedAt: new Date('2025-04-10T17:30:00.000Z'),
    __v: 0,
  });

  await rental1.save();
  await rental2.save();
  console.log('💖 Seeded Rentals');
};

module.exports = seedRentals;