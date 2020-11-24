const express = require('express')
const router = express.Router()

const Training = require('./../models/training.model')
// const User = require('../models/user.model')          


// Endpoints


// Listado de entrenamientos
router.get('/', (req, res, next) => {

    Training
        .find()                                                                             
        .then(allTrainings => res.render('trainings/trainings-list', { allTrainings }))     
        .catch(err => next(err))
})




// Detalle de entrenamiento
router.get('/detalle/:training_id', (req, res, next) => {

    const trainingId = req.params.training_id

    Training
        .findById(trainingId)
        .then(theTraining => res.render('trainings/details', theTraining))
        .catch(err => next(err))
})





// Formulario nuevo entrenamiento: (GET)
router.get('/crear-entrenamiento', (req, res) => res.render('trainings/new-training-form'))


// Formulario nuevo entrenamiento: (POST)
router.post('/crear-entrenamiento', (req, res) => {

    const { name, description, type, duration, exerciseNumber, exercise, image } = req.body

    Training
        .create({ name, description, type, duration, exerciseNumber, exercise, image })
        .then(() => res.redirect('/entrenamientos'))
        .catch(err => console.log('Error:', err))
})





// Formulario edición entrenamiento: (GET)
router.get('/editar-entrenamiento', (req, res) => {

    const trainingId = req.query.training_id

    Training
        .findById(trainingId)
        .then(trainingInfo => res.render('trainings/edit-training-form', trainingInfo))
        .catch(err => console.log(err))
})



// Formulario edición entrenamiento: (POST)
router.post('/editar-entrenamiento', (req, res) => {

    const trainingId = req.query.training_id                            

    const { name, description, type, duration, exerciseNumber, exercise, image } = req.body    

    Training
        .findByIdAndUpdate(trainingId, { name, description, type, duration, exerciseNumber, exercise, image })
        .then(trainingInfo => res.redirect('/entrenamientos'))
        .catch(err => console.log(err))
})




// Eliminar entrenamiento
router.get('/eliminar-entrenamiento', (req, res) => {

    const trainingId = req.query.training_id

    Training
        .findByIdAndDelete(trainingId)
        .then(() => res.redirect('/entrenamientos'))
        .catch(err => console.log(err))
})

// Lista de entrenamientos favoritos: (GET)
router.get('/entrenamientos-fav', (req, res) => {

    const trainingId = req.query.training_id

    Training
        .findById(trainingId)
        .then(trainingInfo => res.render('trainings/fav-trainings', trainingInfo))
        .catch(err => console.log(err))
})

// Mis entrenamientos: (GET)
router.get('/mis-entrenamientos', (req, res) => {

    const trainingId = req.query.training_id

    Training
        .findById(trainingId)
        .then(trainingInfo => res.render('trainings/my-own-trainings', trainingInfo))
        .catch(err => console.log(err))
})

// Añadir a favoritos

router.get('/entrenamientos/entrenamientos-fav', (req, res) => {

    const trainingId = req.query.training_id                            

    const { name, description, type, duration, exerciseNumber, exercise, image } = req.body    

    Training
        .findById(trainingId, { name, description, type, duration, exerciseNumber, exercise, image })
        .then(training => {
                User.favourites.push(training)
                res.render('trainings/fav-trainings')})
        .catch(err => console.log(err))
})

module.exports = router