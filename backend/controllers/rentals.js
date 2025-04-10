// backend/controllers/rentals.js
const Rental = require('../models/rental');

module.exports = {
  addFeedback: async (req, res) => {
    try {
      const { rentalId, costumeId, rating, comment } = req.body;
      const customerId = req.body.customerId || req.user.id; // Lấy từ token nếu có auth middleware

      const rental = await Rental.findOne({
        _id: rentalId,
        customerID: customerId,
        'deleteInfo.isDeleted': false,
      });
      if (!rental) {
        return res.status(404).json({ message: 'Không tìm thấy Rental hoặc bạn không có quyền' });
      }

      const item = rental.items.find(
        (i) => i.costumeID.toString() === costumeId.toString()
      );
      if (!item) {
        return res.status(404).json({ message: 'Costume không có trong Rental này' });
      }

      if (item.feedback && item.feedback.rating) {
        // Cập nhật feedback
        item.feedback.rating = rating;
        item.feedback.comment = comment;
        item.feedback.createdAt = new Date();
      } else {
        // Thêm feedback mới
        item.feedback = { rating, comment, createdAt: new Date() };
      }

      await rental.save();
      res.status(200).json({ message: 'Đã thêm/cập nhật feedback', rental });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getFeedbackByCostume: async (req, res) => {
    try {
      const { costumeId } = req.params;
      const rentals = await Rental.find({
        'items.costumeID': costumeId,
        'items.feedback.rating': { $exists: true },
        'deleteInfo.isDeleted': false,
      }).populate('customerID', 'username');

      const feedbacks = rentals.flatMap((rental) =>
        rental.items
          .filter((item) => item.costumeID.toString() === costumeId && item.feedback)
          .map((item) => ({
            customer: rental.customerID.username,
            rentalDate: rental.rentalDate,
            rating: item.feedback.rating,
            comment: item.feedback.comment,
          }))
      );

      res.json(feedbacks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};