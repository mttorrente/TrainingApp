const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Training = require('./../models/training.model')
const User = require('../models/user.model')


const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' })


// Trainings list
router.get('/', (req, res, next) => {

    Training
        .find()                                                                             
        .then(allTrainings => res.render('trainings/trainings-list', { allTrainings }))     
        .catch(err => next(err))
})


// Training details
router.get('/detalle/:training_id', (req, res, next) => {

    const trainingId = req.params.training_id

    Training
        .findById(trainingId)
        .then(theTraining => res.render('trainings/details', theTraining))
        .catch(err => next(err))
})


// New training form: (GET)
router.get('/crear-entrenamiento',  ensureAuthenticated, checkRole(['USER', 'ADMIN']), (req, res) => res.render('trainings/new-training-form',  { user: req.user, isAdmin: req.user.role.includes('ADMIN', 'USER') }))


// New training form: (POST)
router.post('/crear-entrenamiento', (req, res) => {
    
    const { name, description, type, duration, exercisesNumber, exercises, location, image, owner } = req.body
    
    // const ownerInfo = req.user._id

    Training
        .create({ name, description, type, duration, exercisesNumber, exercises, location, image, owner})
        .then(() => res.redirect('/entrenamientos'))
        .catch(err => console.log('Error:', err))
})


// Edit training form: (GET)
router.get('/editar-entrenamiento', (req, res) => {

    const trainingId = req.query.training_id

    Training
        .findById(trainingId)
        .then(trainingInfo => res.render('trainings/edit-training-form', trainingInfo))
        .catch(err => console.log(err))
})


// Edit training form: (POST)
router.post('/editar-entrenamiento', (req, res) => {

    const trainingId = req.query.training_id                            

    const { name, description, type, duration, exerciseNumber, exercise, location, image, user_id } = req.body    

    Training
        .findByIdAndUpdate(trainingId, { name, description, type, duration, exerciseNumber, exercise, location, image, user_id })
        .then(trainingInfo => res.redirect('/entrenamientos'))
        .catch(err => console.log(err))
})


// Delete training
router.get('/eliminar-entrenamiento', (req, res) => {

    const trainingId = req.query.training_id

    Training
        .findByIdAndDelete(trainingId)
        .then(() => res.redirect('/entrenamientos'))
        .catch(err => console.log(err))
})


// My own trainings: (GET)
router.get('/mis-entrenamientos',ensureAuthenticated ,(req, res) => {

    const id = req.user.id
    const filterId = mongoose.Types.ObjectId(id)

    Training
        .find({owner: filterId})
        .then(items => {
            res.render('trainings/my-own-trainings',{ items })
        })
        .catch(err => console.log(err))
})


// Favourite trainings list: (GET)
router.get('/entrenamientos-favoritos', (req, res) => {

    const userId = req.user._id

    User
        .findById(userId)
        .then(userInfo => {
            console.log(userInfo)
            res.render('trainings/fav-trainings', userInfo)
        })
        .catch(err => console.log(err))
})


// Add to favourite trainings list: (POST)
router.post('/entrenamientos-fav', ensureAuthenticated, (req, res) => {

    const trainingId = req.query.training_id                            

    const {favourites,_id} = req.user   

    Training
        .findById(trainingId)
        .then(training => {
            let favList = [...favourites, training]
            return User.findByIdAndUpdate({_id}, { favourites: favList })
           
        })
            
        .then(res.redirect('/entrenamientos/entrenamientos-favoritos'))
        .catch(err => console.log(err))
})


module.exports = router