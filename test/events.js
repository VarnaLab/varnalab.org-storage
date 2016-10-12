
const env = process.env.NODE_ENV || 'development'

var t = require('assert')
var cp = require('child_process')
var path = require('path')
var request = require('request')
var config = require('../config/server')[env]


describe('events', () => {
  var server

  before((done) => {
    server = cp.spawn('node', [path.join(__dirname, '../server/index.js')])
    server.stdout.on('data', (data) => {
      if (/^Oh Hi/.test(data.toString().trim())) {
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
        done()
      }
    })
  })

  after(() => {
    server.kill()
  })
})
