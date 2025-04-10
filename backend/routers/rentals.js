// backend/routers/rentals.js
const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentals');

router.post('/feedback', rentalController.addFeedback);
router.get('/feedback/costume/:costumeId', rentalController.getFeedbackByCostume);

module.exports = router;