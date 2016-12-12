
var fs = require('fs')
var path = require('path')

var dbpath = path.join(__dirname, 'varnalab.sqlite')

if (fs.existsSync(dbpath)) {
  fs.unlinkSync(dbpath)
}

var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(dbpath)

var schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8')
var dump = fs.readFileSync(path.join(__dirname, 'insert.sql'), 'utf8')


module.exports = {
  schema: (done) => {
    db.serialize(() => {
      db.exec(schema)
      done()
    })
    db.close()
  },
  dump: (done) => {
    db.serialize(() => {
      db.exec(schema)
      db.exec(dump)
      done()
    })
    db.close()
  }
}

if (!module.parent) {
  module.exports.schema(() => console.log('Database Created!'))
}
