const db = require('../utils/db')
const table = 'subjects'
const query = `CREATE TABLE IF NOT EXISTS ${table} (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(250) NOT NULL,
  id_student INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_subject FOREIGN KEY(id_student) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
)`

db.query(query, function() {

})