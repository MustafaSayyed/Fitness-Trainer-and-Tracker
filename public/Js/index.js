const active_features = document.querySelectorAll('.active');
const features = document.querySelectorAll('.feature');
const left_arrow = document.querySelector('.left-arrow');
const right_arrow = document.querySelector('.right-arrow');

let first_feature = 0;
let second_feature = 1;
let third_feature = 2;

right_arrow.addEventListener('click', () => {
    if (third_feature < 4) {
        features[first_feature].classList.remove('active');
        features[second_feature].classList.remove('active');
        features[third_feature].classList.remove('active');
        first_feature++;
        second_feature++;
        third_feature++;
        features[first_feature].classList.add('active');
        features[second_feature].classList.add('active');
        features[third_feature].classList.add('active');
    }
})

left_arrow.addEventListener('click', () => {
    if (first_feature > 0) {
        features[first_feature].classList.remove('active');
        features[second_feature].classList.remove('active');
        features[third_feature].classList.remove('active');
        first_feature--;
        second_feature--;
        third_feature--;
        features[first_feature].classList.add('active');
        features[second_feature].classList.add('active');
        features[third_feature].classList.add('active');
    }
})

if (first_feature == 0) {
    left_arrow.style.color = 'white';
}

let effect = document.querySelectorAll(".effect");

effect.forEach((container) => {
    container.addEventListener("mouseover", () => {
        container.style.transform = "scale(1.06)";
    });
    container.addEventListener("mouseout", () => {
        container.style.transform = "scale(1)";
    });
});

