let Costume = require('../models/costume');

module.exports = {
    getAllCostumes: async (req, res) => {
        try {
            const costumes = res.locals.filteredData || await Costume.find().populate('categoryID', 'name');
            res.json(costumes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCostumeById: async (req, res) => {
        try {
            const costume = await Costume.find().populate('categoryID', 'name');
            if (!costume) return res.status(404).json({ message: 'Costume not found' });
            res.status(200).json(costume);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    searchCostumes: async (req, res) => {
        try {
            const { slug, character, tags } = req.query;

            let query = {};

            if (slug) {
                query.slug = slug;
            }

            if (character) {
                query.character = { $regex: character, $options: 'i' }; // không phân biệt hoa thường
            }

            if (tags) {
                const tagArray = tags.split(','); // Ví dụ: tags=anime,cosplay
                query.tags = { $in: tagArray };
            }

            const costumes = await Costume.find(query).populate('categoryID', 'name');
            res.status(200).json(costumes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    createCostume: async (req, res) => {
        try {
            const costume = new Costume(req.body);
            const saved = await costume.save();
            res.status(201).json(saved);
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({ message: 'Invalid data format', errors: err.errors });
            }
            return res.status(500).json({ message: 'Error creating costume', error: err.message });
        }
    },

    updateCostume: async (req, res) => {
        try {
            const updatedCostume = await Costume.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });

            if (!updatedCostume) {
                return res.status(404).json({ message: 'Costume not found' });
            }
            res.status(200).json(updatedCostume);
        } catch (error) {
            res.status(500).json({ message: 'Error updating costume', error });
        }
    },

    deleteCostume: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedCostume = await Costume.findByIdAndUpdate(id, { isDeleted: true }, { new: true });

            if (!deletedCostume) {
                return res.status(404).json({ message: 'Costume not found' });
            }

            res.status(200).json({ message: 'Costume deleted successfully (Soft delete)' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting costume', error });
        }
    },
}