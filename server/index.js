
const env = process.env.NODE_ENV || 'development'

var path = require('path')

var config = require('../config/server')[env]
config.port = process.env.PORT || config.port
config.db = process.env.DB || path.resolve(__dirname, '../schema', config.db)

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(config.db)
var routes = require('./routes')

var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')


var app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

app.use(routes(db))

app.listen(config.port, () => console.log('Oh Hi', config.port, '!'))
