const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role'
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: [String],
});

module.exports = mongoose.model('User', userSchema);