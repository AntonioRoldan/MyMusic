const mongoose = require('mongoose')

const advertSchema = new mongoose.Schema({
    userEmail: { // user _id will be used
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
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
        required: false
    },
    condition: {
        type: Number,
        required: true
    },
    imgurl: {
        type: String,
        required: false
    }
})

const Advert = mongoose.model('Advert', advertSchema)
module.exports = Advert
