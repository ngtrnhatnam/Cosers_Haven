const express = require('express');
const router = express.Router();
const controller = require('../controllers/rentals');
const filterDeleted = require('../middlewares/filterDeleted');
const Rental = require('../models/rental');

router.get('/', filterDeleted(Rental), controller.getAllRentals);
router.get('/all', controller.getAllRentals);
router.get('/:id', controller.getRentalById);
router.post('/', controller.createRental);
router.put('/:id', controller.updateRental);
router.delete('/:id', controller.deleteRental);
router.patch('/:id/restore', controller.restoreRental);

module.exports = router;