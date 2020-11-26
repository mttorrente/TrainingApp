const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trainingSchema = new Schema({
    name: {
        type: String,
        default: 'Entrenamiento', 
        require: true
    },
    description: String,
    type: {
        type: String,
        enum: ['Al aire libre', 'En casa']
    },
    duration: {
        type: Number,
        min: 15
    },
    exercisesNumber: {
        type: Number,
        min: 1 
    },
    exercises: {
        type: String,
        enum: ['Pecho', 'Espalda', 'Brazos', 'Piernas', 'Abdomen', 'Cardio']       
    },
    location: {                 
        type: {
            type: String
        },
        coordinates: [Number]
    },
    image: String,

    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'       
    }
}, {
    timestamps: true
});

trainingSchema.index({ location: '2dsphere' }) 

const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;