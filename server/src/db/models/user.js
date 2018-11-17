const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        trim: true,
    },
    email: { //How do we make sure the user inserts a valid email?
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    },
    rating: {
        type: Number,
        required: false
    },
    wishlist: {
        type: Array,
        required: false
    }
    //Add a user's adverts
})

const User = mongoose.model('User', userSchema)
module.exports = User
