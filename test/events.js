
const env = process.env.NODE_ENV || 'development'

var t = require('assert')
var cp = require('child_process')
var path = require('path')
var request = require('request')
var _import = require('../schema/import')
var config = require('../config/server')[env]
var fixtures = {
  events: require('./fixtures/events')
}


describe('events', () => {
  var server

  before((done) => {
    _import.dump(() => {
      server = cp.spawn('node', [path.join(__dirname, '../server/index.js')])
      server.stdout.on('data', (data) => {
        if (/^Oh Hi/.test(data.toString().trim())) {
          done()
        }
      })
    })
  })

  it('get events', (done) => {
    request({
      method: 'GET',
      url: 'http://localhost:' + config.port + '/api/events',
      qs: {
        created_at: {$gt: '2016-12-12 15:11:14.513 +00:00'}
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
        body: 'amazing',
        source: 'bot',
        author: 'simo',
        created_at: new Date(),
        updated_at: new Date()
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

  after(() => {
    server.kill()
  })
})
