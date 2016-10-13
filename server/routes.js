
var express = require('express')
var uuid = require('uuid')


module.exports = (m) => {
  var routes = express()

  routes.post('/api/events', (req, res) => {
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

  return routes
}
