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
        enum: ['Público', 'Privado']
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
    image: String
}, {
    timestamps: true
});

const Training = mongoose.model("Training", trainingSchema);

module.exports = Training;