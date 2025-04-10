let mongoose = require('mongoose');
let slugify = require('slugify');

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    slug: { 
        type: String, 
        unique: true 
    },
<<<<<<< HEAD:backend/schemas/category.js
    deleteInfo: {
        isDeleted: {
            type: Boolean,
            default: false
        },
        deletedAt: {
            type: Date,
            default: null
        },
        deleteReason: {
            type: String,
            default: ''
        },
        restoreAt: {
            type: Date, 
            default: null
        },
    },
=======
    isDeleted: {
        type: Boolean,
        default: false
    }
>>>>>>> b72e69ef11034dde096e0834091b70d8760acec3:schemas/category.js
}, {
    timestamps: true
});

categorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { 
            lower: true, 
            strict: true 
        });
    }
    next();
});

module.exports = categorySchema;