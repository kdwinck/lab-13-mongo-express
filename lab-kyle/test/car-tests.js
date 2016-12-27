let expect = require('chai').expect
let request = require('superagent')
let mongoose = require('mongoose')

let url = 'http://localhost:3000/api'

describe('a restfull endpoint', function() {

  let server

  before(function() {
    server = require('../index.js')
    server.listen(3000)
  })

  after(function() {
    server.close()
  })

  describe('an unregisterd route', function() {
    it('will respond 404', function(done) {
      request.get(`${url}/cars/1234`)
      .end((err, res) => {
        expect(res.status).to.equal(404)
        done()
      })
    })
  })

})
