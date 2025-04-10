let adminAccount = require('../models/adminAccount');
let bcrypt = require('bcrypt');

module.exports = {
    getAllAccount: async (req, res) => {
      try {
        const accounts = res.locals.filteredData || await adminAccount.find();
        res.json(accounts);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },
  
    getAccountByUsername: async (username) => {
      return adminAccount.findOne({ username: username });
    },
  
    getAccountByEmail: async (email) => {
      return adminAccount.findOne({ email: email });
    },
  
    getAccountById: async (req, res) => {
      try {
        const account = await adminAccount.findById(req.params.id);
        if (!account) return res.status(404).json({ message: 'Account not found' });
        res.status(200).json(account);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    },
  
    createAccount: async (req, res) => {
      try {
        // Kiểm tra sự tồn tại của username và email
        const existingUsername = await adminAccount.findOne({ username: req.body.username });
        const existingEmail = await adminAccount.findOne({ email: req.body.email });
        
        if (existingUsername) return res.status(400).json({ error: 'Username already exists' });
        if (existingEmail) return res.status(400).json({ error: 'Email already exists' });
  
        const account = new adminAccount(req.body);
        const saved = await account.save();
        res.status(201).json(saved);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    },
  
    updateAccount: async (req, res) => {
      try {
        const updateData = { ...req.body };
  
        // Nếu có thay đổi mật khẩu thì mã hóa lại
        if (updateData.password) {
          let salt = await bcrypt.genSalt(10);
          let hash = await bcrypt.hash(updateData.password, salt);
          updateData.password = hash;
        }
  
        const updatedAccount = await adminAccount.findByIdAndUpdate(req.params.id, updateData, { new: true });
  
        if (!updatedAccount) {
          return res.status(404).json({ message: 'Account not found' });
        }
        res.status(200).json(updatedAccount);
      } catch (error) {
        res.status(500).json({ message: 'Error updating account', error });
      }
    },
  
    deleteAccount: async (req, res) => {
      try {
        const id = req.params.id;
        const reason = req.body.reason || 'No reason provided';
  
        const deleted = await adminAccount.findByIdAndUpdate(id, {
          $set: {
            'deleteInfo.isDeleted': true,
            'deleteInfo.deletedAt': new Date(),
            'deleteInfo.deleteReason': reason
          }
        }, { new: true });
  
        if (!deleted) {
          return res.status(404).json({ message: 'Account not found' });
        }
  
        res.status(200).json({ message: 'Account soft deleted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Error deleting account', error });
      }
    }
  };  