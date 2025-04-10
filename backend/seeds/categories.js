const Category = require('../models/category');

const seedCategories = async () => {
  const mongoose = require('mongoose');

const animeId = new mongoose.Types.ObjectId('6616f1a9c3ab5a3f405e7aaa');
const gameId = new mongoose.Types.ObjectId('6616f1a9c3ab5a3f405e7aab');

const categories = [
  {
    _id: animeId,
    name: 'Anime',
    slug: 'anime',
    description: 'Trang phục nhân vật anime nổi tiếng',
    deleteInfo: { isDeleted: false },
  },
  {
    _id: gameId,
    name: 'Game',
    slug: 'game',
    description: 'Trang phục từ các tựa game đình đám',
    deleteInfo: { isDeleted: false },
  },
];


  await Category.deleteMany(); // Clear trước cho sạch
  for (const cat of categories) {
    const category = new Category(cat);
    await category.save(); // cái này sẽ kích hoạt pre('save') → tự tạo slug
  }
  console.log('✅ Seeded Categories');
};

module.exports = seedCategories;