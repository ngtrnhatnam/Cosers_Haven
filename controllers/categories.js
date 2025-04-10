let Category = require('../models/category');

module.exports = {
    getAllCategories: async (req, res) => {
        try {
            const categories = res.locals.filteredData || await Category.find();
            res.json(categories);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCategoryByIdOrSlug: async (req, res) => {
        try {
            const param = req.params.id;
    
            let category;

            // Nếu param là ObjectId hợp lệ, là format chuẩn của một MongoDB ObjectId.
            // ^: Bắt đầu chuỗi
            // [0-9a-fA-F]: Cho phép bất kỳ ký tự nào từ 0 đến 9, a đến f, và A đến F
            // {24}: Phải có chính xác 24 ký tự
            // $: Kết thúc chuỗi
            if (/^[0-9a-fA-F]{24}$/.test(param)) {
                category = await Category.findById(param);
            }
    
            if (!category) {
                category = await Category.findOne({ slug: param });
            }
    
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    

    createCategory: async (req, res) => {
        try {
            const category = new Category(req.body);
            const saved = await category.save();
            res.status(201).json(saved);
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({ message: 'Invalid data format', errors: err.errors });
            }
            return res.status(500).json({ message: 'Error creating category', error: err.message });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });

            if (!updatedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({ message: 'Error updating category', error });
        }
    },

    deleteCategory: async (req, res) => {
        try {
            const id = req.params.id;
            const deletedCategory = await Category.findByIdAndUpdate(id, { isDeleted: true }, {new: true});
    
            if (!deletedCategory) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            res.status(200).json({ message: 'Category deleted successfully (soft deleted)' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting category', error });
        }
    },

}