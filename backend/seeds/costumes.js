const mongoose = require('mongoose');
const Costume = require('../models/costume');

const seedCostumes = async () => {
  const costumes = [
    {
      _id: new mongoose.Types.ObjectId('6616fab4c3ab5a3f405e7ccc'), // cố định luôn nhen
      name: 'Nezuko Kimono',
      description: '🌸 Bộ kimono dễ thương của Nezuko trong Kimetsu no Yaiba, cực kỳ phù hợp với các bạn thích style dễ thương!',
      pricePerDay: 120000,
      series: 'Kimetsu no Yaiba',
      categoryID: new mongoose.Types.ObjectId('6616f1a9c3ab5a3f405e7aaa'),
      images: ['http://localhost:3000/uploads/costumes/nezuko_kimono_cos.png'],
      character: 'Nezuko',
      sizes: [
        { size: 'S', quantity: 5 },
        { size: 'M', quantity: 10 },
        { size: 'L', quantity: 3 },
      ],
      category: 'Anime',
      tags: ['nezuko', 'kimetsu', 'anime'],
      slug: 'nezuko-kimono',
    },
    {
      _id: new mongoose.Types.ObjectId('6616fac3c3ab5a3f405e7ccd'),
      name: 'Ahri KDA',
      description: '💫 Trang phục Ahri phiên bản K/DA – siêu hot với hiệu ứng sân khấu lấp lánh, dành cho những ai muốn toả sáng!',
      pricePerDay: 150000,
      series: 'League of Legends',
      categoryID: new mongoose.Types.ObjectId('6616f1a9c3ab5a3f405e7aab'),
      images: ['http://localhost:3000/uploads/costumes/ahri_all_out_black_1.png'],
      character: 'Ahri',
      sizes: [
        { size: 'S', quantity: 7 },
        { size: 'M', quantity: 4 },
        { size: 'L', quantity: 2 },
      ],
      category: 'Game',
      tags: ['ahri', 'lol', 'kda'],
      slug: 'ahri-kda',
    },
  ];

  await Costume.deleteMany();
  await Costume.insertMany(costumes);
  console.log('👘 Seeded Costumes');
};

module.exports = seedCostumes;