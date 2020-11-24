const mongoose = require('mongoose');
const Training = require('../models/training.model');
const User = require('../models/user.model');

const dbtitle = 'trainingAppDB';
mongoose.connect(`mongodb://localhost/${dbtitle}`), { useUnifiedTopology: true, useNewUrlParser: true }

Training.collection.drop()
User.collection.drop()


const trainings = [
    {
        name: 'Clase de zumba',
        description: 'Ven a nuestra clase de zumba a las 17h en El Retiro.',
        type: 'Público',
        duration: 50,
        exercisesNumber: 4,
        exercises: 'Cardio',
        location: [40.41837, -3.68295],
        image: '/images/Zumba1.jpeg'
    },

    {
        name: 'Clase de yoga',
        description: 'Únete a una relajante clase de yoga a las 18h en Madrid Río.',
        type: 'Público',
        duration: 40,
        exercisesNumber: 6,
        exercises: 'Cardio',
        location: [40.39752, -3.71010],
        image: '/images/yoga1.jpeg'
    },

    {
        name: 'Crossfit al aire libre',
        description: 'Apúntate a nuestro team de crossfiteros en el parque Tierno Galván a las 17:30h.',
        type: 'Público',
        duration: 60,
        exercisesNumber: 8,
        exercises: 'Cardio',
        location: [40.38998, -3.68242],
        image: '/images/crossfit1.jpg'
    },

    {
        name: 'Running',
        description: 'Reunión de runners en Casa de Campo a las 19h.',
        type: 'Público',
        duration: 60,
        exercisesNumber: 1,
        exercises: 'Cardio',
        location: [40.42083, -3.72830],
        image: '/images/running.jpg'
    },

    {
        name: 'Mindfullness',
        description: 'Clase de meditación guiada en el parque de La Elipa a las 20h.',
        type: 'Público',
        duration: 50,
        exercisesNumber: 1,
        exercises: 'Cardio',
        location: [40.41969, -3.65591],
        image: '/images/meditacion.jpg'
    },

    {
        name: 'Patinaje',
        description: 'Reunión de patinadores en el Paseo de Coches de El Retiro, a las 19:30h.',
        type: 'Público',
        duration: 60,
        exercisesNumber: 3,
        exercises: 'Cardio',
        location: [40.41184, -3.67904],
        image: '/images/patinaje.jpg'
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


