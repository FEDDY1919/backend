const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Product =  require('../models/product')
const User = require('../models/user')

commentsRouter.get('/', async(request,response) =>{
    const comments = await Comment.find({})
    .populate('user',{username:1})
    .populate('product',{name:1})
    response.json(comments)
})

commentsRouter.get('/:id', async(request,response) =>{
    const comment = await Comment.findById(request.params.id)
    if(comment) response.json(comment)
    else   response.status(404).end()
    
})

commentsRouter.post('/', async(request,response)=>{
    const {userId,content,productId} = request.body
    
    const product = await Product.findById(productId)
    const user = await User.findById(userId)

    const comment = new Comment({
        user:user._id,
        content,
        product:product._id,
        date: new Date()
    })

    const savedComment = await comment.save()
    response.status(201).json(savedComment)
})

commentsRouter.delete('/:id', async (request, response) => {
    await Comment.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

commentsRouter.put('/:id', async(request,response) =>{

    const {content} = request.body
    Comment.findByIdAndUpdate(request.params.id,{content:content})
    .then(updatedContent => response.json(updatedContent))
    .catch(error => next(error))

})

module.exports = commentsRouter