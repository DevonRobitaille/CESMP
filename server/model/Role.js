const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Invalid Role Name']
    },
    value: {
        type: Number,
        required: [true, 'Invalid Role Value']
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Role', rolesSchema)