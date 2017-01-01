'use strict'

let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Author = require('../model/author')

let router = module.exports = new Router()

router.post('/api/authors', jsonParser, (req, res) => {
  new Author(req.body).save()
    .then(author => res.json(author))
    .catch(() => {
      res.status(400).send('bad request')
    })
})

router.get('/api/authors', (req, res, next) => {
  Author.find({})
    .then(schema => res.json(schema))
    .catch(next)
})

router.get('/api/authors/:id', (req, res) => {
  Author.findById(req.params.id)
    .then(author => res.json(author))
    .catch(() => {
      res.status(404).send('not found')
    })
})

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

router.delete('/api/authors/:id', (req, res) => {
  Author.remove(req.params.id)
    .then(author => res.json(author))
    .catch(() => {
      res.status(404).send('not found')
    })
})
