const studentModel = require('../models/students')
const readXlsxFile = require('read-excel-file/node');
function importExcelData2MySQL(filepath) {
  readXlsxFile(filepath).then(function (rows) {
    console.log(rows)
    rows.shift()
    studentModel.insertStudent([rows])
  })
}
module.exports = {
  insertStudent: async function (req, res) {
    importExcelData2MySQL(__basedir + '/uploads/'+ req.file.filename)
    const data = {
      msg: 'File uploaded successfully',
      file: req.file
    }
    res.status(200).send(data)
  }
}