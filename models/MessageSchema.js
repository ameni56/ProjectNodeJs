const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    pseudo: {
        required: true,
        type: String,
        unique: true
    },
    content: {
        required: true,
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now
      },
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;