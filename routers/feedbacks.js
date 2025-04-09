const express = require('express');
const router = express.Router();
const controller = require('../controllers/feedbacks');
const filterDeleted = require('../middlewares/filterDeleted');
const Feedback = require('../models/feedback');

router.get('/', filterDeleted(Feedback), controller.getAllFeedbacks);
router.get('/all', controller.getAllFeedbacks);
router.post('/', controller.createFeedback);
router.put('/:id', controller.updateFeedback);
router.delete('/:id', controller.deleteFeedback);

module.exports = router;