// let mongoose = require('mongoose')
let Book  = require('../model/book')
let Author = require('../model/author')

new Author({ name: 'Neal Stephenson' }).save()
  .then(neal => {
    new Book({ _author: neal._id, title: 'Seveneves' }).save()
    .then(book => {
      neal.books.push(book)
      neal.save().then(() => {
        Author.findById(neal._id)
        .then(a => console.log(a))
      })
    })
  })

/*
new Author({ name: 'Neal Stephenson' }).save()
  .then(neal => new Book({ _author: neal._id, title: 'Seveneves' }).save())
  .then(book => {
    console.log(book)
    console.log(neal)
  })
  */
