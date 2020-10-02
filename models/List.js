const { Schema, model} = require('mongoose');
// create schema for database
const schema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    liked: {
        type: Boolean,
        default: false
    },
    estimated: {
        type: Boolean,
        default: false
    }
});

module.exports = model('comments', schema);