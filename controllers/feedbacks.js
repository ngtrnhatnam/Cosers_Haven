const Feedback = require('../models/feedback');

module.exports = {
    getAllFeedbacks: async (req, res) => {
        try {
            const feedbacks = res.locals.filteredData || await Feedback.find();
            res.status(200).json(feedbacks);
        } catch (error) {
            res.status(500).json({ message: 'Error getting feedbacks', error });
        }
    },

    createFeedback: async (req, res) => {
        try {
            const feedback = new Feedback(req.body);
            const saved = await feedback.save();
            res.status(201).json(saved);
        } catch (err) {
            res.status(500).json({ message: 'Error creating feedback', err });
        }
    },

    updateFeedback: async (req, res) => {
        try {
            const updated = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updated) return res.status(404).json({ message: 'Feedback not found' });
            res.status(200).json(updated);
        } catch (error) {
            res.status(500).json({ message: 'Error updating feedback', error });
        }
    },

    deleteFeedback: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await Feedback.findByIdAndUpdate(id, {
                isDeleted: true,
                deletedAt: new Date()
            }, { new: true });

            if (!deleted) return res.status(404).json({ message: 'Feedback not found' });

            res.status(200).json({ message: 'Feedback soft deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting feedback', error });
        }
    }
};
