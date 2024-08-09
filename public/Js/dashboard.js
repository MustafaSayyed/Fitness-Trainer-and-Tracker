var menu = document.getElementById('menuIcon');
var options = document.getElementById('options');
menu.addEventListener('click', () => {
    if (options.style.display === 'block') {
        options.style.display = 'none';
    } else {
        options.style.display = 'block';
    }
});

window.addEventListener('click', (event) => {
    if (!event.target.matches('#menuIcon')) {
        options.style.display = 'none';
    }
})

//Adding Dates
let date = document.getElementById('date');
let month = document.getElementById('month');
let year = document.getElementById('year');

let currentDate = new Date();
date.textContent = currentDate.getDate();
let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
month.textContent = months[currentDate.getMonth()]
year.textContent = currentDate.getFullYear();


//Making the Background blur and Showing Form
const workForm = document.getElementById('workoutForm');
const NutriForm = document.getElementById('nutritionForm');
const blur = document.getElementById('blur');
var bodyContent = document.getElementById('dashboard-container');
let form1 = false;
let form2 = false;
workoutForm = () => {
    blur.classList.toggle('active');
    bodyContent.classList.toggle('active');
    if (form1 == false) {
        workForm.style.display = 'block';
        form1 = true;
    } else {
        workForm.style.display = 'none';
        form1 = false;
    }
};

NutritionForm = () => {
    blur.classList.toggle('active');
    bodyContent.classList.toggle('active');
    if (form2 == false) {
        NutriForm.style.display = 'block';
        form2 = true;
    } else {
        NutriForm.style.display = 'none';
        form2 = false;
    }
};

var days = [];
var carbsArray = [];
var proteinArray = [];
var calorieArray = [];
var waterIntakeArray = [];
var stepsArray = [];
var weightArray = [];
var calorieBurnArray = [];
var heartRateArray = [];

async function fetchLast7DaysData() {
    try {
        const response = await fetch('/api/data/last7days');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();

        // Process and display the data
        days = data.nutritionData.map(item => item.day);
        carbsArray = data.nutritionData.map(item => item.carbs);
        proteinArray = data.nutritionData.map(item => item.protein);
        calorieArray = data.nutritionData.map(item => item.calorie);
        waterIntakeArray = data.nutritionData.map(item => item.water_intake);

        stepsArray = data.workoutData.map(item => item.step);
        weightArray = data.workoutData.map(item => item.weight);
        calorieBurnArray = data.workoutData.map(item => item.calorie_burn);
        heartRateArray = data.workoutData.map(item => item.heart_rate);

        return {
            days,
            carbsArray,
            proteinArray,
            calorieArray,
            waterIntakeArray,
            stepsArray,
            weightArray,
            calorieBurnArray,
            heartRateArray
        };

    } catch (error) {
        console.error('Fetch error:', error);
    }
}

fetchLast7DaysData();

fetchLast7DaysData().then(data => {
    if (data) {

        console.log('Steps Array:', data.stepsArray);
        console.log('Weight Array:', data.weightArray);
        console.log('Calorie Burn Array:', data.calorieBurnArray);
        console.log('Heart Rate Array:', data.heartRateArray);

        console.log('Days:', days);
        console.log('Carbs Array:', data.carbsArray);
        console.log('Protein Array:', data.proteinArray);
        console.log('Calorie Array:', data.calorieArray);
        console.log('Water Intake Array:', data.waterIntakeArray);

        var chart1 = document.getElementById('stepChart').getContext('2d');
        console.log(chart1);
        var stepChart = new Chart(chart1, {
            type: 'bar', 
            data: {
                labels: data.days.reverse(),
                datasets: [{
                    label: 'Steps',
                    data: data.stepsArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: false
            }
        });

        var chart2 = document.getElementById('weightChart').getContext('2d');
        var myChart = new Chart(chart2, {
            type: 'line',
            data: {
                labels: data.days,
                datasets: [{
                    label: 'Steps',
                    data: data.weightArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: false
            }
        });

        var chart3 = document.getElementById('calorieBurnChart').getContext('2d');
        var myChart = new Chart(chart3, {
            type: 'pie',
            data: {
                labels: data.days,
                datasets: [{
                    data: data.calorieBurnArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: "Calorie Burn Analysis",
                        position: 'bottom',
                        color: "#843a91",
                        font: {
                            size: '16px'
                        }
                    }
                },
                responsive: false
            }
        });
        var chart4 = document.getElementById('heartRateChart').getContext('2d');
        var myChart = new Chart(chart4, {
            type: 'doughnut',
            data: {
                labels: data.days.reverse(),
                datasets: [{
                    label: 'Steps',
                    data: data.heartRateArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });

        var chart5 = document.getElementById('carbsChart').getContext('2d');
        var myChart = new Chart(chart5, {
            type: 'bar', 
            data: {
                labels: data.days.reverse(),
                datasets: [{
                    label: 'Steps',
                    data: data.carbsArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: false
            }
        });

        var chart6 = document.getElementById('proteinChart').getContext('2d');
        var myChart = new Chart(chart6, {
            type: 'line',
            data: {
                labels: data.days,
                datasets: [{
                    label: 'Steps',
                    data: data.proteinArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                responsive: false
            }
        });

        var chart7 = document.getElementById('calorieChart').getContext('2d');
        var myChart = new Chart(chart7, {
            type: 'pie',
            data: {
                labels: data.days.reverse(),
                datasets: [{
                    label: 'Steps',
                    data: data.calorieArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });

        var chart8 = document.getElementById('waterIntakeChart').getContext('2d');
        var myChart = new Chart(chart8, {
            type: 'doughnut',
            data: {
                labels: data.days.reverse(),
                datasets: [{
                    label: 'Steps',
                    data: data.waterIntakeArray.reverse(),
                    backgroundColor: [
                        'rgba(156, 97, 167, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                        'rgba(156, 97, 167, 0.6)'
                    ],
                    borderColor: [
                        'rgba(156, 97, 167, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(156, 97, 167, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
    }

});