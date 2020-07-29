const db = require('../utils/db')
const table = 'scores'
const query = `CREATE TABLE IF NOT EXISTS ${table} (
  id INT PRIMARY KEY AUTO_INCREMENT,
  score INT NOT NULL,
  description VARCHAR(250),
  id_student INT NOT NULL,
  id_subject INT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_score_student FOREIGN KEY(id_student) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_score_subject FOREIGN KEY(id_subject) REFERENCES subjects(id) ON DELETE CASCADE ON UPDATE CASCADE
)`

db.query(query, function () {})