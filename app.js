const express = require('express');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/FitFusion');
const path = require('path');
const user = require('./models/user.js');
const workout = require('./models/workout.js');
const nutrition = require('./models/nutrition.js');
const dataRouter = require('./routes/dataRouter');
const dotenv = require('dotenv');
const port = process.env.PORT || 3000

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true, }));
app.use('/api', dataRouter);

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public/login.html"));
});


app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public/signup.html"));
});

app.post("/createUser", async (req, res) => {
    const newUser = await user.create({
        gender: req.body.gender,
        age: req.body.age,
        height: req.body.height,
        weight: req.body.weight,
        goal: req.body.goal,
        workout_frequency: req.body.frquency,
        exercise_level: req.body.experience,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    console.log(newUser);
    res.redirect("/dashboard");
})

app.get("/contact-us", (req, res) => {
    res.sendFile(path.join(__dirname, "public/contact-us.html"))
})

app.get("/dashboard", async (req, res) => {
    const currentDay = days[currentDate.getDay()];
    let data1 = await workout.findOne({day: currentDay});
    let data2 = await nutrition.findOne({day: currentDay});
    console.log(data1);
    console.log(data2);
    if (data1 && !data2) {
        let { step, weight, calorie_burn, heart_rate } = await workout.findOne({day: currentDay});
        res.render("dashboard", { step, weight, calorie_burn, heart_rate,calorie: 0, protein: 0, carbs: 0, water_intake: 0 });

    } else if (!data1 && data2){
        let { calorie, protein, carbs, water_intake } = await nutrition.findOne({ day: currentDay });
        res.render("dashboard", {calorie, protein, carbs, water_intake, step:0, weight: 0, calorie_burn: 0, heart_rate: 0 })
    } else if(data1 && data2) {
        let { step, weight, calorie_burn, heart_rate } = await workout.findOne({ day: currentDay });
        let { calorie, protein, carbs, water_intake } = await nutrition.findOne({ day: currentDay });
        res.render("dashboard", { step, weight, calorie_burn, heart_rate, calorie, protein, carbs, water_intake });
    } else {
        res.render("dashboard", {calorie: 0, protein: 0, carbs: 0, water_intake: 0, step:0, weight: 0, calorie_burn: 0, heart_rate: 0 })
    }
})

const days = ["Sun", "Mon", "Tue", "Wed", "Thus", "Fri", "Sat"];
var currentDate = new Date();

app.post("/workoutData", async (req, res) => {
    const currentDay = days[currentDate.getDay()];
    console.log(currentDay); // Get the current day name
    let newWorkout;

    if (await workout.findOne({ name: req.body.name, day: currentDay })) {
        newWorkout = await workout.findOneAndUpdate({ name: req.body.name, day: currentDay }, {
            $inc: {
                step: req.body.step,
                calorie_burn: req.body.calorie_burn,
            },
            heart_rate: req.body.heart_rate,
            weight: req.body.weight
        }, { new: true });
        console.log(newWorkout);
    } else {
        newWorkout = await workout.create({
            name: req.body.name,
            day: currentDay,
            step: req.body.step,
            weight: req.body.weight,
            calorie_burn: req.body.calorie_burn,
            heart_rate: req.body.heart_rate
        });
        console.log(newWorkout);
    }
    res.redirect("/dashboard")
    // Render the dashboard and pass the newWorkout object
});


app.post("/nutritionData", async (req, res) => {
    const currentDay = days[currentDate.getDay()];
    console.log(currentDay); // Get the current day name
    let newNutrition;

    if (await nutrition.findOne({ name: req.body.name, day: currentDay })) {
        newNutrition = await nutrition.findOneAndUpdate({ name: req.body.name, day: currentDay }, {
            $inc: {
                carbs: req.body.carbs,
                protein: req.body.protein,
                calorie: req.body.calorie,
                water_intake: req.body.water_intake,
            }
        }, { new: true });
        console.log(newNutrition);
    } else {
        newNutrition = await nutrition.create({
            name: req.body.name,
            day: currentDay,
            carbs: req.body.carbs,
            protein: req.body.protein,
            calorie: req.body.calorie,
            water_intake: req.body.water_intake
        });
        console.log(newNutrition);
    }
    res.redirect("/dashboard")
});


app.listen(port, () => {
    console.log("Server is running on port", `http://localhost:${port}`);
})