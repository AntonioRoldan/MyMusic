const mongoose = require('mongoose')

console.log('connecting to database...')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/swapio', { useNewUrlParser: true }, err => {
  if (!err) {
    console.log('...connected to database')
  } else {
    console.log('error connecting:', err)
  }
})

module.exports = { mongoose }
