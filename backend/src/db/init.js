const { mongoose } = require('./mongoose')
const Advert = require('./models/advert')
const User = require('./models/user')
const userMocks = require('./mocks/user-mocks')
const advertMocks = require('./mocks/advert-mocks')

const db = mongoose.connection

async function clean(callback) {
  await User.remove({})
  await Advert.remove({})
  return callback()
}

function createNewData() {
  userMocks.map(userDef => {
    const u1 = new User(userDef)
    u1.save((err, u) => {
      if (err) console.error(err)
      console.log('added', u)
    })
  })

  advertMocks.map(advertDef => {
    const a1 = new Advert(advertDef)
    a1.save((err, a) => {
      if (err) console.error(err)
      console.log('added', a)
    })
  })
}

db.once('open', () => {
  clean(() => {
    createNewData()
  })
})

setTimeout(() => {
  console.log('exiting...')
  process.exit(0)
}, 2000)
