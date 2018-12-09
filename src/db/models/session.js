const mongoose = require('mongoose')

const sessionSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    APIkey: {
        type: String,
        required: true,
        minlength: 10,
    },
    expiry: {
        type: Date,
        required: true,
    }
})

const Session = mongoose.model('Session', sessionSchema)
module.exports = Session
