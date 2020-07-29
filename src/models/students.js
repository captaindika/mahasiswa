const db = require('../utils/db')
const table = 'students'
module.exports = {
  findStudent: function (id) {
    const query = `SELECT COUNT (*) AS total FROM ${table} WHERE id = ${id}`
    return new Promise(function (resolve, reject) {
      db.query(query, function(err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].total)
        }
      })
    })
  }
}