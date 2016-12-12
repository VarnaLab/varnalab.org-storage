
var express = require('express')
var uuid = require('uuid')


module.exports = (m) => {
  var api = express()

  api.get('/events', (req, res) => {
    m.events.findAll({where: req.query}).then((events) => {
      res.writeHead(200, {'content-type': 'application/json'})
      res.end(JSON.stringify({body: events}))
    })
    .catch((err) => {
      res.writeHead(400, {'content-type': 'application/json'})
      res.end(JSON.stringify({body: err.message}))
    })
  })

  api.post('/events', (req, res) => {
    req.body.id = uuid.v1()
    m.events.create(req.body).then((event) => {
      res.writeHead(200, {'content-type': 'application/json'})
      res.end(JSON.stringify({body: 'ok'}))
    })
    .catch((err) => {
      res.writeHead(400, {'content-type': 'application/json'})
      res.end(JSON.stringify({body: err.message}))
    })
  })

  return api
}
