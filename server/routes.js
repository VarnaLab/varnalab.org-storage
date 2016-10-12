
var express = require('express')
var uuid = require('uuid')


module.exports = (db) => {
  var routes = express()

  routes.post('/api/events', (req, res) => {
    var columns = Object.keys(req.body)
    columns.splice(0, 0, 'id')
    var values = Object.keys(req.body).map((key) => ('"' + req.body[key] + '"'))
    values.splice(0, 0, '"' + uuid.v1() + '"')

    db.serialize(() => {
      db.run('INSERT INTO `events` (' + columns.join() + ') VALUES (' + values.join() + ');', (err) => {
        if (err) {
          res.writeHead(400, {'content-type': 'application/json'})
          res.end(JSON.stringify({body: err.message}))
        }
        else {
          res.writeHead(200, {'content-type': 'application/json'})
          res.end(JSON.stringify({body: 'ok'}))
        }
      })
    })
  })

  return routes
}
