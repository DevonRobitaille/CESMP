const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const publicationSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    editors: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    medium: {
        type: [String],
        enum: ['Article', 'Book', 'Report', 'Video'],
        required: true
    },
    focusArea: {
        type: [String],
        enum: ['Law', 'Policy', 'Strategy'],
        required: true
    },
    type: {
        type: [String],
        enum: ['Pandemic', 'Fire', 'Flooding', 'Evacuation'],
        required: true
    },
    content: {
        type: Object,
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Publication', publicationSchema);