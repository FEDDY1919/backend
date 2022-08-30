const productsRouter = require('express').Router()
const Product = require('../models/product')
const User = require('../models/user')

productsRouter.get('/', async (request, response) => {
  const products = await Product
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(products)
});

productsRouter.get('/:id', async (request, response) => {
    const product = await Product.findById(request.params.id)
    if (product) {
      response.json(product)
    } else {
      response.status(404).end()
    }
})

productsRouter.post('/', async (request, response, next) => {
  const {name,price,userId} = request.body

  const user = await User.findById(userId)

  const product = new Product({
    name,
    price,
    date: new Date(),
    rating: 0,
    user: user._id
  })

  const savedProduct = await product.save()
  user.products = user.products.concat(savedProduct._id)
  await user.save()
  
  response.json(savedProduct)
})

productsRouter.delete('/:id', async (request, response, next) => {
      await Product.findByIdAndRemove(request.params.id)
      response.status(204).end()
  })

productsRouter.put('/:id', async(request, response, next) => {
  const {name,price} = request.body

  const product = {
    name,
    price
  }

  Product.findByIdAndUpdate(request.params.id, product, { new: true })
    .then(updatedProduct => {
      response.json(updatedProduct)
    })
    .catch(error => next(error))
})

module.exports = productsRouter