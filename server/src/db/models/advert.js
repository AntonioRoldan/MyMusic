const mongoose = require('mongoose')

const advertSchema = new mongoose.Schema({
    userId: { // user _id will be used
        type: String,
        required: true,
        minlength: 1,
    },
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }, 
    description: {
        type: String,
        required: true,
        minlength: 1,
    },
    tradefor: {         //It could be traded by an item or a list of items can we store arrays or should we create an item document could we store an item document here? 
        type: Array,
        required: true,
    }, 
    category: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
    }, 
    condition: {
        type: Number
    },
});

const Advert = mongoose.model('Advert', advertSchema);
module.exports = Advert;
