let expect = require('chai').expect
let request = require('superagent')
let mongoose = require('mongoose')

let Author = require('../model/author')
let url = 'http://localhost:3000/api'

let testAuthor = {
  name: 'Neal Stephenson'
}

describe('a restfull endpoint', function() {

  let server

  before(done => {
    server = require('../index.js')
    server.listen(3000)
    mongoose.connection.on('open', done)
  })

  // after(() => {
  //   server.close()
  // })

<<<<<<< HEAD:lab-kyle/test/author-tests.js
  // describe('an unregisterd route', function() {
  //   it('will respond 404', function(done) {
  //     request.get(`${url}/authors/1234`)
  //     .end((err, res) => {
  //       expect(res.status).to.equal(404)
  //       expect(res.text).to.equal('not found')
  //       done()
  //     })
  //   })
  // })
=======
  describe('an unregisterd route', function() {
    it('will respond 404', function(done) {
      request.get(`${url}/cars/1234`)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        expect(res.text).to.equal('not found')
        done()
      })
    })
  })
>>>>>>> master:lab-kyle/test/car-tests.js

  describe('GET', function() {

    describe('/api/authors', function() {
      it('will return an array of authors', function(done) {
        request.get(`${url}/authors/`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(typeof res.body).to.equal(typeof [])
            done()
          })
      })
    })
<<<<<<< HEAD:lab-kyle/test/author-tests.js
    describe('/api/authors/:id', function() {
=======

    describe('/api/cars/:id', function() {
>>>>>>> master:lab-kyle/test/car-tests.js

      before( done => {
        new Author(testAuthor).save()
          .then( author => {
            this.testAuthor = author
            done()
          })
          .catch(done)
      })
      after( done => {
        Author.remove({})
          .then( () => done())
          .catch(done)
      })

      it('can fetch a schema object', done => {
        request.get(`${url}/authors/${this.testAuthor._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Neal Stephenson')
            done()
          })
      })
    })
  })

  describe('POST', function() {
    after( done => {
      Author.remove({})
        .then( () => done())
        .catch(done)
    })

<<<<<<< HEAD:lab-kyle/test/author-tests.js
    it('can create a new author', function(done) {
      request.post(`${url}/authors/`)
        .send({name: 'William Gibson'})
        .end((err, res)  => {
          if (err) return done(err)
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('William Gibson')
          done()
        })
=======
    describe('/api/cars/', function() {

      it('can create a new car', function(done) {
        request.post(`${url}/cars/`)
          .send({name: 'Chevy'})
          .end( (err, res)  => {
            if (err) return done(err)
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Chevy')
            done()
          })
      })

      it('will throw an error if no body is provided', function(done) {
        request.post(`${url}/cars/`)
          .end( (err, res) => {
            expect(res.status).to.equal(400)
            expect(res.text).to.equal('bad request')
            done()
          })
      })
>>>>>>> master:lab-kyle/test/car-tests.js
    })
  })

  describe('PUT', function() {

<<<<<<< HEAD:lab-kyle/test/author-tests.js
    before( done => {
      new Author(testAuthor).save()
        .then( author => {
          this.testAuthor = author
=======

    describe('/api/cars/id', function() {

      before( done => {
        new Car(testCar).save()
        .then( car => {
          this.testCar = car
>>>>>>> master:lab-kyle/test/car-tests.js
          done()
        })
        .catch(done)
      })

<<<<<<< HEAD:lab-kyle/test/author-tests.js
    after( done => {
      Author.remove({})
=======
      after( done => {
        Car.remove({})
>>>>>>> master:lab-kyle/test/car-tests.js
        .then( () => done())
        .catch(done)
      })

<<<<<<< HEAD:lab-kyle/test/author-tests.js
    it('can update a author', done => {
      request.put(`${url}/authors/${this.testAuthor._id}`)
        .send({name: 'PKD'})
        .end( (err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.name).to.equal('PKD')
          done()
        })
=======
      it('can update a car', done => {
        request.put(`${url}/cars/${this.testCar._id}`)
          .send({name: 'Toyota'})
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            expect(res.body.name).to.equal('Toyota')
            done()
          })
      })
      it('will return 400 if no body is provided', done => {
        request.put(`${url}/cars/${this.testCar._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(400)
            expect(res.text).to.equal('bad request')
            done()
          })
      })

      // dont know why this test fails, perhaps something with the model?
      it('will return 404 if provided an invalid id', done => {
        request.put(`${url}/cars/fail`)
          .send({name: 'Toyota'})
          .end( (err, res) => {
            expect(res.status).to.equal(404)
            expect(res.text).to.equal('not found')
            done()
          })
      })
>>>>>>> master:lab-kyle/test/car-tests.js
    })

    describe('DELETE', function() {

      before( done => {
        new Author(testAuthor).save()
          .then( author => {
            this.testAuthor = author
            done()
          })
          .catch(done)
      })

      it('can delete a author', done => {
        request.delete(`${url}/authors/${this.testAuthor._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(200)
            // expect(res.body).to.equal({})
            done()
          })
      })

      // dont know why this one doesnt work either....
      it('will return not found with invalid id', done => {
        request.delete(`${url}/cars/${this.testCar._id}`)
          .end( (err, res) => {
            expect(res.status).to.equal(400)
            expect(res.text).to.equal('not found')
            done()
          })
      })
    })
  })
})
