const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resourcesSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    resource_roles: [{
        roles_id: {
            type: Schema.Types.ObjectId,
            ref: 'Roles'
        },
        description: {
            type: String,
            required: true
        },
        post: { // create
            type: Boolean,
            default: false
        },
        delete: { 
            type: Boolean,
            default: false
        },
        put: { // update
            type: Boolean,
            default: false
        },
        get: { 
            type: Boolean,
            default: false
        }
    }]
}, {
    supressReservedKeysWarning: true,
    timestamps: true
})

module.exports = mongoose.model('Resource', resourcesSchema)