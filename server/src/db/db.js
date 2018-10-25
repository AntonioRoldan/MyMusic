const mongoose = require('./mongoose');
const Advert = require('./models/advert')
const User = require('./models/user')
const validation = require('./validation')
const sessions = require('./sessions')

function getAdverts(callback) {
    Advert.find({}).then((adverts) => {
        adverts.sort((a, b) => a.views > b.views)
        callback(null, adverts)
    })
}

function registerUser(username, email, password, res) {
    User.findOne({email: email}, (err, user) => {
        if(err){ 
            res.status(500).send(err)
        }
        if(user) { //If the user already exists 
            res.status(400).send('Email already exists')
        } else {
            try {
                validation.validUser({
                    username: username,
                    email: email,
                    password: password
                })
            } catch (e) {
                res.status(400).send(e)
            }
            var u = new User({username: username, email: email, password: password})
            u.save().then((userData) => {
                res.send(userData)
            }, e => {
                res.status(400).send(e)
            })
        }
    })
}

function loginUser(email, password, res){
    User.findOne({email: email}, (err, user) => {
        if(err){
            res.status(500).send(err)
        } 
        if(user){
            if(user.password == password){
                sessions.newSession(email, APIkey => {
                    res.send(APIkey);
                })
            } else {
                res.status(400).send('Email and password do not match')
            }
        } else {
            res.status(400).send('User not found')
        }
    })
}


module.exports = {getAdverts, registerUser, loginUser};

