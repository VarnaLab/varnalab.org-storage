
var fs = require('fs')
var path = require('path')

var Sequelize = require('sequelize')
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var api = require('./api')


module.exports = (config) => ({
  listen: (done) => {
    var connection = new Sequelize({
      dialect: 'sqlite',
      storage: config.dbpath,
      define: {
        timestamps: false
      }
    })

    var mpath = path.resolve(__dirname, '../models/')

    var models = fs.readdirSync(mpath).reduce((models, file) => {
      var model = require(path.resolve(mpath, file))
      models[path.basename(file, '.js')] = model(connection, Sequelize)
      return models
    }, {})

    var app = express()
    app.use(logger('dev'))
    app.use(bodyParser.json())

    app.use('/api', api(models))

    app.listen(config.port, done)
  }
})
