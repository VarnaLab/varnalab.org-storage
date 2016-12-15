#!/usr/bin/env node

const env = process.env.NODE_ENV || 'development'
var argv = require('minimist')(process.argv.slice(2))

if (argv.h) {
  console.log('-p PORT | web server port')
  console.log('-d /absolute/path/to/varnalab.sqlite | existing database')
  console.log('-d /absolute/path/to/ | creates new database')
  process.exit()
}

var fs = require('fs')
var path = require('path')

var dbpath = argv.d || process.cwd()
var stats = fs.statSync(dbpath)

if (stats.isDirectory()) {
  dbpath = path.join(dbpath, 'varnalab.sqlite')
}

var config = {
  dbpath,
  port: argv.p || 3000
}

var imp = require('../lib/import')(config)
var server = require('../server/')(config)

if (stats.isDirectory()) {
  imp.schema(() => {
    server.listen(() => console.log('Oh Hi', config.port, '!'))
  })
}
else {
  server.listen(() => console.log('Oh Hi', config.port, '!'))
}
