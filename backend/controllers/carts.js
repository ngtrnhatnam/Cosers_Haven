// backend/controllers/carts.js
const mongoose = require('mongoose');
const Cart = require('../models/cart');
const Rental = require('../models/rental');

module.exports = {
  getCartByCustomer: async (req, res) => {
    try {
      const customerId = new mongoose.Types.ObjectId(req.params.customerId); // Chuyển thành ObjectId
      const cart = await Cart.findOne({ customerID: customerId })
        .populate('items.costumeID');
      if (!cart) {
        return res.json({ customerID: req.params.customerId, items: [] });
      }
      res.json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  addItemToCart: async (req, res) => {
    try {
      const customerId = new mongoose.Types.ObjectId(req.params.customerId); // Chuyển thành ObjectId
      const costumeId = new mongoose.Types.ObjectId(req.body.costumeId); // Chuyển thành ObjectId
      const { quantity } = req.body;
      let cart = await Cart.findOne({ customerID: customerId });
      if (!cart) {
        cart = new Cart({ customerID: customerId, items: [] });
      }
      const itemIndex = cart.items.findIndex(
        (item) => item.costumeID.toString() === costumeId.toString()
      );
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity || 1;
      } else {
        cart.items.push({ costumeID: costumeId, quantity: quantity || 1 });
      }
      await cart.save();
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateCartItem: async (req, res) => {
    try {
      const customerId = new mongoose.Types.ObjectId(req.params.customerId);
      const costumeId = new mongoose.Types.ObjectId(req.params.costumeId);
      const { quantity } = req.body;
      const cart = await Cart.findOne({ customerID: customerId });
      if (!cart) {
        return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
      }
      const itemIndex = cart.items.findIndex(
        (item) => item.costumeID.toString() === costumeId.toString()
      );
      if (itemIndex === -1) {
        return res.status(404).json({ message: 'Sản phẩm không có trong giỏ' });
      }
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      const updatedCart = await Cart.findOne({ customerID: customerId })
        .populate('items.costumeID'); // Thêm populate
      res.json(updatedCart);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  removeCartItem: async (req, res) => {
    try {
      const customerId = new mongoose.Types.ObjectId(req.params.customerId);
      const costumeId = new mongoose.Types.ObjectId(req.params.costumeId);
      const cart = await Cart.findOne({ customerID: customerId });
      if (!cart) {
        return res.status(404).json({ message: 'Giỏ hàng không tồn tại' });
      }
      cart.items = cart.items.filter(
        (item) => item.costumeID.toString() !== costumeId.toString()
      );
      await cart.save();
      const updatedCart = await Cart.findOne({ customerID: customerId })
        .populate('items.costumeID'); // Thêm populate
      res.json({ message: 'Đã xóa sản phẩm khỏi giỏ', cart: updatedCart });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  checkoutCart: async (req, res) => {
    try {
      const customerId = new mongoose.Types.ObjectId(req.params.customerId);
      const cart = await Cart.findOne({ customerID: customerId }).populate('items.costumeID');
      if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: 'Giỏ hàng trống' });
      }
      const total = cart.items.reduce(
        (sum, item) => sum + item.quantity * item.costumeID.pricePerDay,
        0
      );
      const rental = new Rental({
        customerID: customerId,
        items: cart.items.map((item) => ({
          costumeID: item.costumeID._id,
          quantity: item.quantity,
          pricePerDay: item.costumeID.pricePerDay,
        })),
        total,
        status: 'pending',
        rentalDate: new Date(),
      });
      await rental.save();
      cart.items = [];
      await cart.save();
      res.status(201).json({ message: 'Thanh toán thành công, đã chuyển sang Rental', rental });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};