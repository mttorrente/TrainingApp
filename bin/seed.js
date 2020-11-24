const mongoose = require('mongoose');
const Training = require('../models/training.model');
const User = require('../models/user.model');

const dbtitle = 'trainingAppDB';
mongoose.connect(`mongodb://localhost/${dbtitle}`), { useUnifiedTopology: true, useNewUrlParser: true }

Training.collection.drop()
User.collection.drop()


const trainings = [
    {
       name: 'Abdominales',
       description: 'Rutina de ejercicios para el abdomen',
       type: 'Privado',
       duration: 30,
       exercisesNumber: 5,
       exercises: 'Abdomen',
       image: '/images/abs.jpeg'  
    }
]


Training
    .create(trainings)
    .then(allTrainingsCreated => {
        console.log(`Created ${allTrainingsCreated.length} trainings`)
        mongoose.connection.close()
    })
    .catch(err => console.log('Hubo un error,', err))


const user = [
    {
        username: 'Pepe',
        password: 'popino',
        role: 'USER',
        favourites: []
        
    }
]

User
    .create(user)
    .then((userFromDB) => {
        console.log(`Created ${userFromDB.length} users`);
        mongoose.connection.close();
    })
    .catch((err) =>
        console.log('Ha habido un error,', err))


