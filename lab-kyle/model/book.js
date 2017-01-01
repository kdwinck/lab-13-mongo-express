'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema

let bookSchema = Schema({
  _author : { type: mongoose.Schema.ObjectId, ref: 'Author' },
  title : {type: String, required: true}
})

module.exports = mongoose.model('Book', bookSchema)
