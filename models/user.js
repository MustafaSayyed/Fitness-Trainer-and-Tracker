const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    gender: String,
    age: Number,
    height: Number,
    weight: Number,
    goal: String,
    workout_frequency: String,
    exercise_level: String,
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

const user = mongoose.model('user', userSchema);
module.exports = user;