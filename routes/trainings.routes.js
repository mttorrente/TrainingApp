const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const uploadCloud = require('../configs/cdn-upload.config.js')


const Training = require('./../models/training.model')
const User = require('../models/user.model')


const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, inicia sesión' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login', { errorMsg: 'Desautorizado, no tienes permisos' })


// Trainings list (GET)
router.get('/', (req, res, next) => {

    if (req.query.select === '1') {
        res.redirect('/entrenamientos/al-aire-libre')
    }
   else if(req.query.select === '2') {
       res.redirect('/entrenamientos/en-casa')
   } else {
   
    Training
    .find()                                                                             
    .then(allTrainings => res.render('trainings/trainings-list', { allTrainings }))     
    .catch(err => next(err))
   }
     
})


// Trainings list at home
router.get('/en-casa', (req, res, next) => {

    Training
        .find({type: 'En casa'})                                                                             
        .then(allTrainings => res.render('trainings/trainings-list', { allTrainings }))     
        .catch(err => next(err))
})


// Trainings list outside
router.get('/al-aire-libre', (req, res, next) => {

    Training
        .find({type: 'Al aire libre'})                                                                             
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
router.post('/crear-entrenamiento', uploadCloud.single('image'), (req, res) => {
    
    const { name, description, type, duration, exercisesNumber, exercises, location } = req.body
    console.log(req.file)
    const image = req.file.path
    
    
    const ownerId = req.user.id

    const filterOwnerId = mongoose.Types.ObjectId(ownerId)

    Training
        .create({ name, description, type, duration, exercisesNumber, exercises, location, image, owner:filterOwnerId })
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
        .then(trainingInfo => res.redirect('/entrenamientos/mis-entrenamientos'))
        .catch(err => console.log(err))
})


// Delete training
router.get('/eliminar-entrenamiento', (req, res) => {

    const trainingId = req.query.training_id

    Training
        .findByIdAndDelete(trainingId)
        .then(() => res.redirect('/entrenamientos/mis-entrenamientos'))
        .catch(err => console.log(err))
})


// My own trainings: (GET)
router.get('/mis-entrenamientos',ensureAuthenticated ,(req, res) => {

    const id = req.user.id
    const filterId = mongoose.Types.ObjectId(id)

    Training
        .find({owner: filterId})
        .then(myTrainings => {
            res.render('trainings/my-own-trainings',{ myTrainings })
        })
        .catch(err => console.log(err))
})


// Favourite trainings list: (GET)
router.get('/entrenamientos-favoritos', (req, res) => {

    const userId = req.user._id

    User
        .findById(userId)
        .then(userInfo => {
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