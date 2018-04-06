var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({
    title:{
        type: String,
        trim: true,
        required: true
    },
    body: {
        type: String,
        required: true,
        trim: true,
    },
    adscription: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    creatorId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('News', NewsSchema);