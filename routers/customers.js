const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const customerController = require('../controllers/customers');
const filterDeleted = require('../middlewares/filterDeleted');

router.get('/', filterDeleted(Customer), customerController.getAllCustomers);
router.get('/all', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById)
router.post('/', customerController.createCustomer);
router.put('/:id', customerController.updateCustomer);  
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;