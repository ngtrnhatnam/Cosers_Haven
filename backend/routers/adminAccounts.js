 const express = require('express');
 const router = express.Router();
 const adminAccount = require('../models/adminAccount');
 const accountController = require('../controllers/adminAccounts');
 const filterDeleted = require('../middlewares/filterDeleted');
 const { validateAdminAccount, handleValidationErrors } = require('../middlewares/validation');
 
 router.get('/', filterDeleted(adminAccount), accountController.getAllAccount);
 router.get('/all', accountController.getAllAccount);
 router.get('/:id', accountController.getAccountById)
 router.post('/', validateAdminAccount, handleValidationErrors, accountController.createAccount);
 router.put('/:id', validateAdminAccount, handleValidationErrors, accountController.updateAccount);  
 router.delete('/:id', accountController.deleteAccount);
 
 module.exports = router;