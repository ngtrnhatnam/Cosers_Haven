const express = require('express');
const router = express.Router();
const controller = require('../controllers/payments');
const filterDeleted = require('../middlewares/filterDeleted');
const Payment = require('../models/payment');

router.get('/', filterDeleted(Payment), controller.getAllPayments);
router.get('/all', controller.getAllPayments);
router.post('/', controller.createPayment);
router.delete('/:id', controller.deletePayment);

module.exports = router;