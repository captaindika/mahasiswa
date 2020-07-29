const db = require('../utils/db')
const table = 'scores'
module.exports = {
  insertScore: function(idStudent,idSubject, score, description) {
    const query = `INSERT INTO ${table} (id_student, id_subject, score, description) VALUE (${idStudent}, ${idSubject}, ${score}, '${description}')`
    return new Promise(function (resolve, reject) {
      db.query(query, function(err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateScore: function(id, score, description) {
    return new Promise(function (resolve, reject) {
      const query = `UPDATE ${table} SET score = ${score}, description = '${description}' WHERE id = ${id}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  deleteScore: function(id) {
    return new Promise(function (resolve, reject) {
      const query = `DELETE FROM ${table} WHERE id = ${id}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  averageScore: function(idStudent) {
    return new Promise(function (resolve, reject) {
      const query = `SELECT AVG(score) AS average FROM scores WHERE id_student= ${idStudent}`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].average)
        }
      })
    })
  },
  getAll: function () {
    return new Promise(function (resolve, reject) {
      const query = `SELECT students.id, students.name, subjects.name, scores.score
      FROM ((${table} 
      INNER JOIN students ON students.id = scores.id_student)
      INNER JOIN subjects ON subjects.id = scores.id_subject)`
      db.query(query, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  }
}
