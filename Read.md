function calculateBMI(weight, height) {
    return weight / Math.pow(height / 100, 2);
}

function calculateCalories(weight, height, age, gender, activityLevel) {
    // Example using Mifflin-St Jeor equation
    let bmr = calculateBMR(weight, height, age, gender);
    return bmr * activityLevel;
}

```

function calculateMacro(calories, proteinPercentage, carbPercentage, fatPercentage) {
    let protein = (proteinPercentage / 100) * calories / 4;
    let carbs = (carbPercentage / 100) * calories / 4;
    let fats = (fatPercentage / 100) * calories / 9;
    return { protein, carbs, fats };
}

function calculateBodyFatPercentage(weight, height, age, gender) {
    // Example using BMI method, actual methods may vary
    let bmi = weight / Math.pow(height / 100, 2);
    return (1.2 * bmi) + (0.23 * age) - (10.8 * gender) - 5.4;
}

function calculate1RM(weight, reps) {
    return weight / (1.0278 - (0.0278 * reps));
}

function calculateBMR(weight, height, age, gender) {
    if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender === 'female') {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    return null;
}

```