const Score = require('express').Router()
const ScoreController = require('../controllers/scores')

Score.post('/insert', ScoreController.insertScore)
Score.delete('/delete/:id', ScoreController.deleteScore)
Score.patch('/update/:id', ScoreController.updateScore)
Score.get('/average-score/:idStudent', ScoreController.findAverageScore)
Score.get('/detail', ScoreController.getAll)

module.exports = Score