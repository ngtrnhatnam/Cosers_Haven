module.exports = (Model) => {
    return async (req, res, next) => {
        try {
            const data = await Model.find({ isDeleted: false });
            res.locals.filteredData = data; // Gắn data vào res.locals để controller xài
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};
