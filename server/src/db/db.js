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

function postAdvert(email, title, description, tradefor, category, postcode, condition, res) {
    a = new Advert({
        userEmail: email,
        title: title,
        description: description,
        tradefor: tradefor,
        category: category,
        postcode: postcode,
        condition: condition
    })
    a.save().then((advertData) => {
        res.send(advertData)
    }, e => {
        res.status(400).send(e.message)
    })
}

function registerUser(username, email, password, confirmpassword, res) {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        if (user) { //If the user already exists 
            res.status(400).send('Email already exists')
        } else {
            try {
                validation.validUser({
                    username: username,
                    email: email,
                    password: password,
                    confirmpassword: confirmpassword
                })
            } catch (e) {
                return res.status(400).send(e.message)
            }
            var u = new User({ username: username, email: email, password: password })
            u.save().then((userData) => {
                res.send(userData)
            }, e => {
                res.status(400).send(e)
            })
        }
    })
}

function logoutUser(APIkey, res) {
    sessions.getSession(APIkey, session => {
        if (session) {
            sessions.invalidatePrevSessions(session.email, () => {
                res.send('Success')
            })
        } else {
            res.send(`Cannot find session ${APIkey}`)
        }
    })
}

function checkSession(APIkey, res) {
    sessions.getSession(APIkey, session => res.send(!!session))
}

function whoAmI(APIkey, res) {
    sessions.emailFromSession(APIkey, email => {
        if (email) return res.send(email)
        res.status(404).send("")
    })
}

function loginUser(email, password, res) {
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            res.status(500).send(err)
        }
        if (user) {
            if (user.password == password) {
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


module.exports = {
    getAdverts,
    registerUser,
    loginUser,
    logoutUser,
    checkSession,
    postAdvert,
    whoAmI
};
