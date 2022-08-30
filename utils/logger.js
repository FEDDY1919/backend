const info = (...params) => { // Prints out the error involved
    console.log(...params)
  }
  
  const error = (...params) => {
    console.error(...params)
  }
  
  module.exports = {
    info, error
  }

  