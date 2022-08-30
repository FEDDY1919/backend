require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URL = process.env.MONGODB_URL //Uses the mongoDB url in the .env file username and password is in there (APT200/APT200)

module.exports = {
  MONGODB_URL,
  PORT
}