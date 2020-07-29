const db = require('../utils/db')
const table = 'students'

const query = `CREATE TABLE IF NOT EXISTS ${table} (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  address VARCHAR(300) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)`

db.query(query, function () {
})