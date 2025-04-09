const Rental = require('../models/rental');

module.exports = {
    getAllRentals: async (req, res) => {
        try {
            const rentals = res.locals.filteredData || await Rental.find();
            res.json(rentals);
        } catch (error) {
            res.status(500).json({ message: 'Error getting rentals', error });
        }
    },

    getRentalById: async (req, res) => {
        try {
            const rental = await Rental.findById(req.params.id);
            if (!rental) return res.status(404).json({ message: 'Rental not found' });
            res.json(rental);
        } catch (error) {
            res.status(500).json({ message: 'Error getting rental', error });
        }
    },

    createRental: async (req, res) => {
        try {
            const rental = new Rental(req.body);
            const saved = await rental.save();
            res.status(201).json(saved);
        } catch (error) {
            res.status(500).json({ message: 'Error creating rental', error });
        }
    },

    updateRental: async (req, res) => {
        try {
            const updated = await Rental.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Rental not found' });
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: 'Error updating rental', error });
        }
    },

    deleteRental: async (req, res) => {
        try {
            const { reason } = req.body;
    
            const deleted = await Rental.findByIdAndUpdate(
                req.params.id,
                {
                    isDeleted: true,
                    deletedAt: new Date(),
                    deleteReason: reason || 'No reason provided'
                },
                { new: true }
            );
    
            if (!deleted) return res.status(404).json({ message: 'Rental not found' });
            res.status(200).json({ message: 'Rental soft deleted', deleted });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting rental', error });
        }
    },
    
    restoreRental: async (req, res) => {
        try {
            const rental = await Rental.findById(req.params.id);
    
            if (!rental || !rental.isDeleted) {
                return res.status(404).json({ message: 'Rental not found or not deleted' });
            }
    
            rental.isDeleted = false;
            rental.deletedAt = null;
            rental.deleteReason = '';
            rental.restoredAt = new Date(); // nếu muốn tracking thêm
            // rental.restoredBy = req.user.id; // nếu có login
    
            await rental.save();
    
            res.status(200).json({ message: 'Rental restored successfully', rental });
        } catch (error) {
            res.status(500).json({ message: 'Error restoring rental', error });
        }
    }    
};
