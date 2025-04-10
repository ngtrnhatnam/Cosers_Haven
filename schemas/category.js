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
    isDeleted: {
        type: Boolean,
        default: false
    }
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