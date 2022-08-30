const config = require('./utils/config')
const express = require('express')
require('express-async-errors') // handles async errors so we dont have to constantly try-catch within out API requests
const app = express()
const cors = require('cors') //Cross-Origin Resource Sharing.
const productsRouter = require('./controllers/products') //imports the routing logic
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')

const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build')) //used to host static files
app.use(express.json()) // transform json to js objects
app.use(middleware.requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/products', productsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app