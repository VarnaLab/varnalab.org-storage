
var t = require('assert')
var path = require('path')
var request = require('request')

var config = {
  dbpath: path.resolve(__dirname, '../schema/varnalab.sqlite'),
  port: 3000
}
var imp = require('../lib/import')(config)
var server = require('../server')(config)
var fixtures = {
  events: require('./fixtures/events')
}


describe('events', () => {

  before((done) => {
    imp.drop()
    imp.schema(() => imp.fixtures(() => imp.close(() => server.listen(done))))
  })

  it('get events', (done) => {
    request({
      method: 'GET',
      url: 'http://localhost:' + config.port + '/api/events',
      qs: {
        created_at: {$gt: 1482192000000}
      },
      callback: (err, res, body) => {
        if (err) {
          done(err)
          return
        }
        t.deepEqual(JSON.parse(body), fixtures.events)
        done()
      }
    })
  })

  it('create event', (done) => {
    request({
      method: 'POST',
      url: 'http://localhost:' + config.port + '/api/events',
      json: {
        title: 'hey',
        description: 'amazing',
        start_at: Date.now(),
        author: 'simo',
        source: 'test',
        created_at: Date.now(),
        updated_at: Date.now()
      },
      callback: (err, res, body) => {
        if (err) {
          done(err)
          return
        }
        t.deepEqual(body, {body: 'ok'})
        request({
          method: 'GET',
          url: 'http://localhost:' + config.port + '/api/events',
          qs: {
            title: 'hey'
          },
          callback: (err, res, body) => {
            if (err) {
              done(err)
              return
            }
            var events = JSON.parse(body).body
            t.equal(events.length, 1)
            t.equal(events[0].title, 'hey')
            done()
          }
        })
      }
    })
  })
})
