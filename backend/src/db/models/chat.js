const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
  to: String,
  from: String,
  date: {
    type: Date,
    default: Date.now
  },
  message: String
})

const Chat = mongoose.model('Chat', chatSchema)
module.exports = Chat
