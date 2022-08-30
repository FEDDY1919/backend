const mongoose = require('mongoose')



const commentSchema = new mongoose.Schema({

  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  content:{
    type:String,
    required:true
  },
  date: Date,
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  } //transforms id to string and removes _v value, idk if you need the _v value
})

module.exports = mongoose.model('Comment', commentSchema)