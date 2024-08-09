const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    name: String,
    step: {
        type: Number,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    calorie_burn: {
        type: Number,
        required: true
    },
    heart_rate: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        required: true
    }
})

const workout =  mongoose.model('workout', workoutSchema);
module.exports = workout;