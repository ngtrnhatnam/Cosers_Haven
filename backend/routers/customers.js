const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const customerController = require('../controllers/customers');
const filterDeleted = require('../middlewares/filterDeleted');
const { validateCustomer, handleValidationErrors } = require('../middlewares/validation');

router.get('/', filterDeleted(Customer), customerController.getAllCustomers);
router.get('/all', customerController.getAllCustomers);
router.get('/:id', customerController.getCustomerById);
router.post('/', validateCustomer, handleValidationErrors, customerController.createCustomer);
router.put('/:id', validateCustomer, handleValidationErrors, customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.post('/login', customerController.loginCustomer);

module.exports = router;