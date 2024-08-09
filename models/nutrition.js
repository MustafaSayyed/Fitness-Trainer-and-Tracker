const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    name: String,
    carbs: {
        type: Number,
        required: true
    },
    protein: {
        type: Number,
        required: true
    },
    calorie: {
        type: Number,
        required: true
    },
    water_intake: {
        type: Number,
        required: true
    },
    day: {
        type: String,
        required: true
    }
})

const nutrition =  mongoose.model('nutrition', nutritionSchema);
module.exports = nutrition;