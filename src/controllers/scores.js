const ScoreModel = require('../models/scores')
const StudentModel = require('../models/students')
const SubjectModel = require('../models/subjects')

module.exports = {
  insertScore: async function(req, res) {
    let {idStudent, idSubject, score, description} = req.body
    id_student = parseInt(idStudent)
    id_subject = parseInt(idSubject)
    const student = await StudentModel.findStudent(id_student)
    const subject = await SubjectModel.findSubject(id_subject)
    if (student === 1 && subject === 1) {
        const result = await ScoreModel.insertScore(id_student,id_subject,score,description)
        const data = {
        status: 'Success',
        msg: 'Score inserted'
      }
      res.status(200).send(data)
    } else{
      res.status(404).send('Student / Subject id not found')
    }
  },
  deleteScore: async function(req, res) {
    let { id } = req.params
    id_student = parseInt(id)
    const result = await ScoreModel.deleteScore(id_student)
    if (result) {
      res.status(200).send(`Score with id ${id_student} deleted`)
    } else {
      res.status(404).send(`Score with id ${id_student} not found`)
    }
  },
  updateScore: async function(req, res) {
    let {id} = req.params
    let {score, description} = req.body
    score = parseInt(score)
    id = parseInt(id)
    const result = await ScoreModel.updateScore(id, score, description)
    if (result) {
      res.status(200).send(`Score with id ${id} updated`)
    } else {
      res.status(404).send(`Score with id ${id} not found`)
    }
  },
  findAverageScore: async function(req, res) {
    let {idStudent} = req.params
    idStudent = parseInt(idStudent)
    const student = await StudentModel.findStudent(idStudent)
    if (student) {
      const result = await ScoreModel.averageScore(idStudent)
      console.log(result)
      res.status(200).send(`Average score student with id ${idStudent} is ${result}`)
    } else {
      res.status(404).send(`Student with id ${idStudent} not found`)
    }
  },
  getAll: async function(req, res) {
    const result = await ScoreModel.getAll()
    const data = {
      success: true,
      data: result
    }
    res.status(200).send(data)
  }

}