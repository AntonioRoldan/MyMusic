const Advert = require('./models/advert')
const User = require('./models/user')
const validation = require('./validation')
const sessions = require('./sessions')

require('./mongoose')

function getAdverts(callback) {
  Advert.find({}).then(adverts => {
    adverts.sort((a, b) => a.views > b.views)
    callback(null, adverts)
  })
}

function deleteAdvert(advertId, callback) {
  //done
  Advert.findOneAndDelete({ _id: advertId }, (err, advert) => {
    if (err) return callback(500)
    return callback(false, advert)
  })
}

function postAdvert(
  email,
  title,
  description,
  tradefor,
  category,
  postcode,
  condition,
  imgurl,
  callback
) {
  //done
  const a = new Advert({
    userEmail: email,
    title: title,
    description: description,
    tradefor: tradefor,
    category: category,
    postcode: postcode,
    condition: condition,
    imgurl: imgurl,
  })
  a.save().then(
    advertData => {
      return callback(false, advertData)
    },
    e => {
      return callback(500, e.message)
    }
  )
}

function getPoster(email, callback) {
  User.findOne({ email: email }, (err, user) => {
    if (err) return callback(500)
    if (!user) return callback(404)
    return callback(false, {
      id: user._id,
      username: user.username,
    })
  })
}

function getUserEmail(userId, res) {
  User.findOne({ _id: userId }, (err, user) => {
    if (err) return res.status(500).send(err.message)
    if (!user) return res.status(404)
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

function registerUser(username, email, password, callback) {
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return callback(500, 'Failed to connect to database')
    }
    if (user) {
      return callback(400, 'User already exists')
    } else {
      try {
        validation.validUser({
          username: username,
          email: email,
          password: password,
        })
      } catch (e) {
        return callback(406, e.message)
      }
      const u = new User({ username: username, email: email, password: password })
      u.save().then(
        userData => {
          return callback(false, {
            username: userData.username,
            email: userData.email,
          }) //The code must be changed to be more testable
        },
        e => {
          console.log(e)
          return callback(500, e.message)
        }
      )
    }
  })
}

function logoutUser(APIkey, callback) {
  //done
  sessions.getSession(APIkey, session => {
    if (session) {
      sessions.invalidatePrevSessions(session.email, () => {
        return callback(false, 'Success')
      })
    } else {
      return callback(404, `Cannot find session ${APIkey}`)
    }
  })
}

function checkSession(APIkey, callback) {
  sessions.getSession(APIkey, session => callback(session))
}

function addToWishlist(advertId, userEmail, callback) {
  User.findOneAndUpdate(
    {
      email: userEmail,
      wishlist: { $ne: advertId },
    },
    {
      $push: {
        wishlist: advertId,
      },
    },
    (err, user) => {
      if (err) return callback(500, err.message)
      if (user) return callback(false, 'Added to wishlist')
      return callback(404, 'Not added to wishlist')
    }
  )
}

function whoAmI(APIkey, callback) {
  //done
  sessions.emailFromSession(APIkey, email => {
    if (email) return callback(email)
    return callback(404)
  })
}

function loginUser(email, password, callback) {
  //done
  User.findOne({ email: email }, (err, user) => {
    if (err) return callback(500, 'Internal server error')
    if (user) {
      if (user.password === password) {
        sessions.newSession(email, APIkey => {
          return callback(false, APIkey)
        })
      } else {
        return callback(400, 'Invalid credentials')
      }
    } else {
      return callback(404, 'No such user exists!')
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
  deleteAdvert,
}
