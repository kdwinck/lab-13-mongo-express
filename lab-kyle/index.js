let express = require('express')
let mongoose = require('mongoose')

let MONGO_URI = process.env.MONGO_URI
let PORT = process.env.PORT || 3000

mongoose.Promise = Promise
mongoose.connect(MONGO_URI)

let app = express()

let carRouter = require('./route/car-routes')
app.use(carRouter)

module.exports = app

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}
