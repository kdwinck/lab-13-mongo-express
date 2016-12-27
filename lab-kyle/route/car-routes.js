let Router = require('express').Router
let jsonParser = require('body-parser').json()

let Car = require('../model/car')
let router = module.exports = new Router()

router.post('/cars', jsonParser, (req, res, next) => {
  new Car(req.body).save()
    .then(car => res.json(car))
    .catch(next)
})

router.get('/cars/:id', (req, res, next) => {
  Car.findById(req.params.id)
    .then(car => res.json(car))
    .catch(next)
})
