let mongoose = require('mongoose');
let slugify = require('slugify');

let costumeSchemas = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    character: {
        type: String,
<<<<<<< HEAD:backend/schemas/costume.js
        default: ''
    },
    series: {
        type: String,
        default: ''
=======
        required: true
    },
    series: {
        type: String
>>>>>>> b72e69ef11034dde096e0834091b70d8760acec3:schemas/costume.js
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
<<<<<<< HEAD:backend/schemas/costume.js
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
>>>>>>> b72e69ef11034dde096e0834091b70d8760acec3:schemas/costume.js
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