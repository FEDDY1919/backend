//Middleware are functions that can be used for handling request and response objects.

const logger = require('./logger')

const requestLogger = (request, response, next) => { // Logs tAPI Requests
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next() //sends it to the next middleware
}

const unknownEndpoint = (request, response) => {//404 error
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => { 
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}