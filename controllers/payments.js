const Payment = require('../models/payment');

module.exports = {
    getAllPayments: async (req, res) => {
        try {
            const payments = res.locals.filteredData || await Payment.find();
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ message: 'Error getting payments', error });
        }
    },

    createPayment: async (req, res) => {
        try {
            const payment = new Payment(req.body);
            const saved = await payment.save();
            res.status(201).json(saved);
        } catch (err) {
            res.status(500).json({ message: 'Error creating payment', err });
        }
    },

    deletePayment: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await Payment.findByIdAndUpdate(id, {
                isDeleted: true,
                deletedAt: new Date()
            }, { new: true });

            if (!deleted) return res.status(404).json({ message: 'Payment not found' });

            res.status(200).json({ message: 'Payment soft deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting payment', error });
        }
    }
};
