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

const studentRouter = require('./src/routes/students')
// const subjectRouter = require('./src/routes/subjects')
const scoreRouter = require('./src/routes/scores')

app.use('/student', studentRouter)
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

