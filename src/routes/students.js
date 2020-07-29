const Student = require('express').Router()
const fs = require('fs');
const multer = require('multer');
const readXlsxFile = require('read-excel-file/node');
const studentController = require('../controllers/students')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __basedir + '/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname+"-"+Date.now()+"-"+file.originalname)
  }
})

const upload = multer({storage: storage})

Student.post('/uploadfile', upload.single("uploadfile"), studentController.insertStudent)

module.exports = Student