// backend/controllers/customers.js
let Customer = require('../models/customer');
let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Thêm jwt

module.exports = {
  getAllCustomers: async (req, res) => {
    try {
      const customers = res.locals.filteredData || await Customer.find();
      res.json(customers);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getUserByUsername: async function (username) {
    return Customer.findOne({ username: username });
  },

  getUserByEmail: async function (email) {
    return Customer.findOne({ email: email });
  },

  getCustomerById: async (req, res) => {
    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) return res.status(404).json({ message: 'Customer not found' });
      res.status(200).json(customer);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createCustomer: async (req, res) => {
    try {
      const customer = new Customer(req.body);
      const saved = await customer.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (updateData.password) {
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(updateData.password, salt);
        updateData.password = hash;
      }
      const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ message: 'Error updating customer', error });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const id = req.params.id;
      const reason = req.body.reason || 'No reason provided';
      const deleted = await Customer.findByIdAndUpdate(id, {
        $set: {
          'deleteInfo.isDeleted': true,
          'deleteInfo.deletedAt': new Date(),
          'deleteInfo.deleteReason': reason,
        },
      }, { new: true });
      if (!deleted) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.status(200).json({ message: 'Customer deleted successfully (Soft Delete)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting customer', error });
    }
  },

  loginCustomer: async (req, res) => {
    try {
      const { usernameOrEmail, password } = req.body;
      // Tìm customer bằng username hoặc email
      const customer = await Customer.findOne({
        $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      });
      if (!customer || customer.deleteInfo?.isDeleted) {
        return res.status(400).json({ message: 'Tài khoản không tồn tại hoặc đã bị xóa' });
      }
      // Kiểm tra password
      const isMatch = await bcrypt.compare(password, customer.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Mật khẩu không đúng' });
      }
      // Tạo JWT token
      const token = jwt.sign({ id: customer._id }, 'your-secret-key', { expiresIn: '1h' });
      res.status(200).json({
        message: 'Đăng nhập thành công',
        token,
        customer: { id: customer._id, username: customer.username, email: customer.email },
      });
    } catch (err) {
      res.status(500).json({ message: 'Lỗi server', error: err.message });
    }
  },
};