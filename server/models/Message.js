const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 60 * 1000),
        index: { expires: '1h' }
    }
});

module.exports = mongoose.model('Message', messageSchema);