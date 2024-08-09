const express = require('express');
const router = express.Router();
const workout = require('../models/workout.js');
const nutrition = require('../models/nutrition.js');

router.get('/data/last7days', async (req, res) => {
    try {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];

        var currentDate = new Date();
        const currentDayIndex = currentDate.getDay();
        const currentDay = days[currentDayIndex];

        // Prepare array to store results for each day
        let workoutData = [];
        let nutritionData = [];

        // Iterate through each day in the last 7 days
        for (let i = 0; i < days.length; i++) {
            const day = days[(currentDayIndex - i + days.length) % days.length];

            // Query workout data for the current day
            const foundWorkout = await workout.findOne({ day });
            console.log(foundWorkout);
            if (foundWorkout) {
                workoutData.push(foundWorkout);
            } else {
                workoutData.push({ day, step: 0, weight: 0, calorie_burn: 0, heart_rate: 0 });
            }

            // Query nutrition data for the current day
            const foundNutrition = await nutrition.findOne({ day });
            if (foundNutrition) {
                nutritionData.push(foundNutrition);
            } else {
                nutritionData.push({ day, calorie: 0, protein: 0, carbs: 0, water_intake: 0 });
            }
        }

        // console.log('Workout Data:', workoutData);
        // console.log('Nutrition Data:', nutritionData);

        res.json({ workoutData, nutritionData });
    } catch (error) {
        console.error('Error in /data/last7days:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
