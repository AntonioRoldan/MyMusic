
function validUser(user) {
    return validEmail(user.email) && validUsername(user.username) && validPassword(user.password)
}

function validEmail(email) {
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
}

const validUsername = username => {
    if (username.length <= 0) {
        throw new Error('Username not long enough')
    }
    return true
}

const validPassword = password => {
    if(password.length < 7) {
        throw new Error('Password not long enough')
    }
    return true
}

module.exports = { validUser }
