const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    room_name: {
        type: String,
        required: true
    },
    room_token: {
        type: String,
        required: true
    },
    meeting_link: {
        type: String,
        required: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message'
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    expiresAt: {
        type: Date,
        default: () => new Date(Date.now() + 60 * 60 * 1000),
        index: { expires: '1h' }
    }
});

module.exports = mongoose.model('Meeting', meetingSchema);