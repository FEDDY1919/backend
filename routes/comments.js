const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async(request,response) =>{
    const comments = await Comment.find({}).populate('username',{username:1})
    response.json(comments)
})

commentsRouter.get('/:id', async(request,response) =>{
    const comment = await Comment.findById(request.params.id)
    if(comment) response.json(comment)
    else   response.status(404).end()
    
})

commentsRouter.post('/', async(request,response)=>{
    const {username,content} = request.body

    const comment = new Comment({
        username,
        content
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