let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Car = require('../model/car')
let router = module.exports = new Router()

router.post('/api/cars', jsonParser, (req, res, next) => {
  new Car(req.body).save()
    .then(car => res.json(car))
    .catch(next)
})

router.get('/api/cars/:id', (req, res, next) => {
  Car.findById(req.params.id)
    .then(car => res.json(car))
    .catch(next)
})

router.put('/api/cars/:id', jsonParser, (req, res, next) => {
  Car.update(req.params.id, req.body)
    .then(car => res.json(car))
    .catch(next)
})

router.delete('/api/cars/:id', (req, res, next) => {
  Car.remove(req.params.id)
    .then(car => res.json(car))
    .catch(next)
})