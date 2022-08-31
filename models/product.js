const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  name:{
    type:String,
    minlength:6,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  rating:Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  },
  date: Date
})

productSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  } //transforms id to string and removes _v value, idk if you need the _v value
})

module.exports = mongoose.model('Product', productSchema)