const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
   type: String,
   minlength: 8,
   required:true
  },
  name: {
    type: String,
    minlength: 8,
    required:true
   },
  passwordHash: {
    type: String,
    required:true,
   },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]

})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User