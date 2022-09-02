const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  invitedUsers: [{
    type: String
  }],
})

module.exports = mongoose.model('List', ListSchema)