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
    email: {  //How do we make sure the user inserts a valid email? 
        type: String,
        required: true,
        minlength: 1,
        trim: true,
    }
});

const User = new mongoose.model('User', userSchema);
module.exports = User;
