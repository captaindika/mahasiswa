const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const mysql = require('mysql');
global.__basedir = __dirname;
require('dotenv').config()
const port = process.env.PORT

const StudentModel = require('./src/models/students')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, __basedir + '/uploads/')
  },
  filename: (req, file, cb) => {
     cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname)
  }
});

const upload = multer({storage: storage});
 
// -> Express Upload RestAPIs
app.post('/student/uploadfile', upload.single("uploadfile"), (req, res) =>{
  importExcelData2MySQL(__basedir + '/uploads/' + req.file.filename);
  res.json({
        'msg': 'File uploaded/import successfully!', 'file': req.file
      });
});
 
// -> Import Excel Data to MySQL database
function importExcelData2MySQL(filePath){
  // File path.
  readXlsxFile(filePath).then((rows) => {
    // `rows` is an array of rows
    // each row being an array of cells.   
    console.log(rows);
   
    /**
    [ [ 'Id', 'Name', 'Address', 'Age' ],
    [ 1, 'Jack Smith', 'Massachusetts', 23 ],
    [ 2, 'Adam Johnson', 'New York', 27 ],
    [ 3, 'Katherin Carter', 'Washington DC', 26 ],
    [ 4, 'Jack London', 'Nevada', 33 ],
    [ 5, 'Jason Bourne', 'California', 36 ] ] 
    */
   
    // Remove Header ROW
    rows.shift();
   
    // Create a connection to the database
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'tes-mahasiswa'
    });
   
    // Open the MySQL connection
    connection.connect((error) => {
      if (error) {
        console.error(error);
      } else {
        let query = 'INSERT INTO students (name, address) VALUES ?';
        connection.query(query, [rows], (error, response) => {
        console.log(error || response);
 
        /**
        OkPacket {
        fieldCount: 0,
        affectedRows: 5,
        insertId: 0,
        serverStatus: 2,
        warningCount: 0,
        message: '&amp;Records: 5  Duplicates: 0  Warnings: 0',
        protocol41: true,
        changedRows: 0 } 
        */
        });
      }
    });
  })
} 

// const studentRouter = require('./src/routes/students')
// const subjectRouter = require('./src/routes/subjects')
const scoreRouter = require('./src/routes/scores')

// app.use('/student', studentRouter)
// app.use('/subject', subjectRouter)
app.use('/score', scoreRouter)


app.get('/migrate', function(req, res) {
  require('./src/migrations/students')
  require('./src/migrations/subjects')
  require('./src/migrations/scores')
  res.status(200).send('Tables created')
})

app.listen(port, function () {
  console.log(`listening on port ${port}`)
})

