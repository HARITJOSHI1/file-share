const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },

    mimeType: {
        type: String,
        require: true
    },

    size: {
        type: Number,
        require: true
    },

    createdAt: {
        type: Date,
        require: true
    }

});

module.exports = mongoose.model('ImageData', Schema);