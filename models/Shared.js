const mongoose = require('mongoose')

// const queryAllUsers = async () => {
//     user.find({}, (err, users) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(users)
//       }
//     })
//   }

const SharedSchema = new mongoose.Schema({
  shared: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: false
  },
  sharedUsers: {
    type: Array,
    required: false
  }
})

module.exports = mongoose.model('Shared', SharedSchema)
