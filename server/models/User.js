const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    meeting: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meeting'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);