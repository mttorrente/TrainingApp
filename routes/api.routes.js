const express = require('express')
const router = express.Router()

const Training = require('./../models/training.model')


// Endpoints
router.get('/entrenamientos', (req, res) => {

    Training
        .find()
        .then(trainings => res.json(trainings))
        .catch(err => next(err))
})


module.exports = router
