
var fs = require('fs')
var path = require('path')
var sqlite3 = require('sqlite3').verbose()

var schema = fs.readFileSync(
  path.resolve(__dirname, '../schema/schema.sql'), 'utf8')
var fixtures = fs.readFileSync(
  path.resolve(__dirname, '../schema/fixtures.sql'), 'utf8')


module.exports = (config) => {

  var db = new sqlite3.Database(config.dbpath)

  return {
    drop: () => {
      if (fs.existsSync(config.dbpath)) {
        fs.unlinkSync(config.dbpath)
        db = new sqlite3.Database(config.dbpath)
      }
    },
    schema: (done) => {
      db.serialize(() => {
        db.exec(schema)
        done()
      })
    },
    fixtures: (done) => {
      db.serialize(() => {
        db.exec(fixtures)
        done()
      })
    },
    close: (done) => db.close(done)
  }
}
