let mongoose = require('mongoose');
let bcrypt = require('bcrypt')

let customerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username "],
        required: true
    },

    password: {
        type: String,
        required: true
    },

    fullName: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other'
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    phone: String,
    createdAt: {
        type: Date,
        default: Date.now
    },

    avatarUrl: {
        type: String,
        default: ""
    },

    loginCount: {
        type: Number,
        default: 0,
        min: 0
    },
    
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
}, {
    timestamps: true
});

customerSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            let salt = await bcrypt.genSalt(10);
            let hash = await bcrypt.hash(this.password, salt);
            this.password = hash;
        } catch (err) {
            console.error('❌ Error hashing password:', err);
            return next(err); // Chặn save nếu có lỗi
        }
    }
    next();
})

module.exports = customerSchema;