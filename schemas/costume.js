let mongoose = require('mongoose');
let slugify = require('slugify');

let costumeSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    character: {
        type: String,
        required: true
    },
    series: {
        type: String
    },
    sizes: [
        {
          size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL'] },
          quantity: { type: Number, default: 0 }
        }
    ],
    pricePerDay: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    description: {
        type: String,
        default: ''
    },
    rentCount: {
        type: Number,
        default: 0
    },
    slug: { 
        type: String, 
        unique: true 
    },     
    tags: { 
        type: [String], 
        default: [] 
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

costumeSchemas.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { 
            lower: true, 
            strict: true 
        });
    }
    next();
});

module.exports = costumeSchemas;