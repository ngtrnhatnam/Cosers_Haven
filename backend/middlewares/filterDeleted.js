module.exports = (Model) => {
    return async (req, res, next) => {
        try {
            const data = await Model.find({ 'deleteInfo.isDeleted': { $ne: true } });
            res.locals.filteredData = data; // Gắn data vào res.locals để controller xài
            next();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};
