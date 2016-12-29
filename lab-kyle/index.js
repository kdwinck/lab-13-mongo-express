let express = require('express')
let mongoose = require('mongoose')
let morgan = require('morgan')

let MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/authors';
let PORT = process.env.PORT || 3000

mongoose.Promise = Promise
require('./seeds/seed')
mongoose.connect(MONGO_URI)

let app = express()
app.use(morgan('dev'))

let authorRouter = require('./route/author-routes')
app.use(authorRouter)

module.exports = app

if (require.main === module) {
  app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}
