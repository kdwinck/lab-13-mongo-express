'use strict'

let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Author = require('../model/author')
let Book = require('../model/book')

let router = module.exports = new Router()

//// POST routes ///////////////////////////////////////////////////////////////
router.post('/api/authors', jsonParser, (req, res) => {
  new Author(req.body).save()
    .then(author => res.json(author))
    .catch(() => {
      res.status(400).send('bad request')
    })
})

router.post('/api/authors/:id/books', jsonParser, (req, res) => {
  let newBook
  if (req.body.title) {
    Author.findById(req.params.id)
      .then(author => {
        new Book(req.body).save()
      .then(book => {
        newBook = book
        author.books.push(book)
        author.save()
      })
      .then(() => res.json(newBook))
      .catch(() => res.status(400).send('bad request'))
      })
  } else {
    res.status(400).send('bad request')
  }
})

//// GET routes //////////////////////////////////////////////////////////////////////
router.get('/api/authors', (req, res) => {
  Author.find({})
    .then(schema => res.json(schema))
    .catch(() => res.status(404).send('not found'))
})

router.get('/api/books', (req, res) => {
  Book.find({})
    .then(schema => res.json(schema))
    .catch(() => res.status(404).send('not found'))
})

router.get('/api/authors/books/:book_id', (req, res) => {
  Book.findById(req.params.book_id)
    .populate('_author')
    .then(book => res.json(book))
    .catch(() => res.status(404).send('not found'))
})

router.get('/api/authors/:id', (req, res) => {
  Author.findById(req.params.id)
    .then(author => res.json(author))
    .catch(() => {
      res.status(404).send('not found')
    })
})

//// PUT routes ///////////////////////////////////////////////////////////////
router.put('/api/authors/:id', jsonParser, (req, res) => {
  if (req.body.name) {
    Author.findOneAndUpdate(req.params.id, req.body, {new: true})
      .then(author => res.json(author))
      .catch( () => {
        res.status(404).send('not found')
      })
  } else {
    res.status(400).send('bad request')
  }
})


/// DELETE routes //////////////////////////////////////////////////////////////
router.delete('/api/authors/:id', (req, res) => {
  Author.remove(req.params.id)
    .then(author => res.json(author))
    .catch(() => {
      res.status(404).send('not found')
    })
})

router.delete('/api/books/:id', (req, res) => {
  Book.remove(req.params.id)
    .then(book => res.json(book))
    .catch(() => {
      res.status(404).send('not found')
    })
})
