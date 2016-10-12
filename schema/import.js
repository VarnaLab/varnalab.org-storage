
var fs = require('fs')
var path = require('path')

var dbpath = path.join(__dirname, 'varnalab.sqlite')

if (fs.existsSync(dbpath)) {
  fs.unlinkSync(dbpath)
}

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(dbpath)

var dump = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')

db.serialize(() => {
  db.exec(dump)
})

db.close()
