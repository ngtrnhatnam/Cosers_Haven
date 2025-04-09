let Customer = require('../models/customer');
let bcrypt = require('bcrypt');

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

      const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, updateData, {new: true,});

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
      const deletedCustomer = await Customer.findByIdAndUpdate(id, { isDeleted: true }, {new: true});

      if (!deletedCustomer) {
        return res.status(404).json({ message: 'Customer not found' });
      }

      res.status(200).json({ message: 'Customer deleted successfully (Soft Delete)' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting customer', error });
    }
  },
}
