const Session = require('./models/session')
const uuidv4 = require('uuid/v4')

Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf())
    date.setDate(date.getDate() + days)
    return date
}

function invalidatePrevSessions(email, callback) {
    Session.deleteMany({email: email}, callback)
}

function newSession(email, callback) {
    invalidatePrevSessions(email, () => {
        const session = new Session({
            email: email,
            APIkey: uuidv4(),
            expiry: (new Date()).addDays(1)
        })
        session.save((err, sess) => {
            if (err) return callback('')
            if (sess) {
                return callback(sess.APIkey)
            } else {
                return callback('')
            }
        })
    })
}

function getSession(session, callback) {
    Session.findOne({
        APIkey: session
    }, (err, data) => {
        if (err) return callback({})
        return callback(data)
    })
}

function checkSession(email, APIkey, callback) {
    Session.findOne({
        email: email,
        APIkey: APIkey
    }, (err, session) => {
        if (err) return callback(false)

        if (session.expiry <= new Date()) {
            return callback(true)
        } else {
            invalidatePrevSessions(email, () => {
                return callback(false)
            })
        }
    })
}

function emailFromSession(APIkey, callback) {
    Session.findOne({
        APIkey: APIkey
    }, (err, session) => {
        if (err) return callback('')
        if (session) return callback(session.email)
        return callback('')
    })
}

module.exports = { newSession, checkSession, invalidatePrevSessions, getSession, emailFromSession }
