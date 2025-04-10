const { body, validationResult } = require('express-validator');
const adminAccount = require('../models/adminAccount');
const customer = require('../models/customer');

// 👑 Validation dùng chung cho username, email, password, fullName, phone
const commonUserValidation = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 6 }).withMessage('Username must be at least 6 characters')
    .custom(async (value) => {
      const existingAdmin = await adminAccount.findOne({ username: value });
      const existingCustomer = await customer.findOne({ username: value });
      if (existingAdmin || existingCustomer) {
        throw new Error('Username already exists');
      }
      return true;
    }),

  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom(async (value) => {
      const existingAdmin = await adminAccount.findOne({ email: value });
      const existingCustomer = await customer.findOne({ email: value });
      if (existingAdmin || existingCustomer) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  body('fullName')
    .notEmpty().withMessage('Full name is required'),

  body('phone')
    .optional()
    .isMobilePhone().withMessage('Invalid phone number'),
];

// 👩‍💼 Validation riêng cho admin (có role)
const validateAdminAccount = [
  ...commonUserValidation,
  body('role')
    .notEmpty().withMessage('Role is required')
    .isIn(['Admin', 'Staff']).withMessage('Role must be Admin or Staff'),
];

// 🧍 Validation cho customer (dùng chung phần common)
const validateCustomer = [...commonUserValidation];

// 🛡️ Hàm xử lý lỗi
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateAdminAccount,
  validateCustomer,
  handleValidationErrors,
};
