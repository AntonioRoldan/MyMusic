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

function deleteAdvert(advertId) { //done 
    Advert.findOneAndDelete({_id: advertId}, (err, advert) => {
        if(err) return 500
        return advert 
    })
}

function postAdvert(email, title, description, tradefor, category, postcode, condition, imgurl) { //done 
    a = new Advert({
        userEmail: email,
        title: title,
        description: description,
        tradefor: tradefor,
        category: category,
        postcode: postcode,
        condition: condition,
        imgurl: imgurl
    })
    a.save().then((advertData) => {
        return advertData
    }, e => {
        return 500
    })
}

function getPoster(email, callback) {
    User.findOne({email: email}, (err, user) => {
        if(err) return callback(500)
        if(!user) return callback(404)
        return callback(false, {
            id: user._id,
            username: user.username
        })
    })
}

function getUserEmail(userId, res) { 
    User.findOne({_id: userId}, (err, user) => {
        if(err) return res.status(500).send(err.message)
        if(!user) return res.status(404)
        return res.send(user.email)
    })
}

function getAdvert(id, callback) {
    Advert.findOne({ _id: id }, (err, advert) => {
        if (err) return callback(500)
        if (!advert) return callback(404)
        callback(false, advert)
    })
}

function registerUser(username, email, password, confirmpassword) { //done 
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return 500
        }
        if (user) { //If the user already exists 
            return 400
        } else {
            try {
                validation.validUser({
                    username: username,
                    email: email,
                    password: password,
                    confirmpassword: confirmpassword
                })
            } catch (e) {
                return 406
            }
            var u = new User({ username: username, email: email, password: password })
            u.save().then((userData) => {
                return userData //The code must be changed to be more testable 
            }, e => {
                return 500
            })
        }
    })
}

function logoutUser(APIkey) { //done 
    sessions.getSession(APIkey, session => {
        if (session) {
            sessions.invalidatePrevSessions(session.email, () => {
                return 'Success'
            })
        } else {
            return `Cannot find session ${APIkey}`
        }
    })
}

function checkSession(APIkey, callback) {
    sessions.getSession(APIkey, session => callback(session))
}

function addToWishlist(advertId, userEmail, res) {
    User.findOneAndUpdate({email: userEmail}, {$push: {wishlist: advertId}}, (err, user) => {
        if(err) return res.status(500).send(err.message)
        if(user) return res.send(user)
        return res.status(404) 
    })
}

function whoAmI(APIkey) { //done 
    sessions.emailFromSession(APIkey, email => {
        if (email) return email 
        return 400 
    })
}

function loginUser(email, password, callback) { //done 
    User.findOne({ email: email }, (err, user) => {
        if (err) return callback(500)
        if (user) {
            if (user.password == password) {
                sessions.newSession(email, APIkey => {
                    return callback(false, APIkey)
                })
            } else {
                return callback(404)
            }
        } else {
            return callback(400)
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
    getAdvert,
    whoAmI,
    getPoster,
    addToWishlist,
    getUserEmail,
    deleteAdvert
};
