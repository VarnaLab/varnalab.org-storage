
const env = process.env.NODE_ENV || 'development'

var fs = require('fs')
var path = require('path')

var config = require('../config/server')[env]
config.port = process.env.PORT || config.port
config.db = process.env.DB || path.resolve(__dirname, '../schema', config.db)
config.models = process.env.MODELS || path.resolve(__dirname, '../models')

var Sequelize = require('sequelize')
var sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: config.db,
  define: {
    timestamps: false
  }
})
var models = fs.readdirSync(config.models).reduce((models, file) => {
  var model = require(path.resolve(config.models, file))
  models[path.basename(file, '.js')] = model(sequelize, Sequelize)
  return models
}, {})

var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var routes = require('./routes')


var app = express()
app.use(logger('dev'))
app.use(bodyParser.json())

app.use(routes(models))

app.listen(config.port, () => console.log('Oh Hi', config.port, '!'))
