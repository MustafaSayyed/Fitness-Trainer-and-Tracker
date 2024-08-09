document.addEventListener('DOMContentLoaded', () => {
    const nextButtons = document.querySelectorAll('.next');
    console.log(nextButtons);
    const formSteps = document.querySelectorAll('.form-step');
    let currentStep = 0;

    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (currentStep < formSteps.length - 1) {
          formSteps[currentStep].classList.remove('active');
          currentStep++;
          formSteps[currentStep].classList.add('active');
        }
      });
    });

    const labels = document.querySelectorAll('.options label');
    labels.forEach(label => {
      label.addEventListener('click', (event) => {
        const input = document.getElementById(event.target.htmlFor);
        input.checked = true;
        console.log(input.value);
        labels.forEach(lbl => {
          if (lbl !== label) {
            lbl.style.backgroundColor = '';
            lbl.style.borderColor = '#ccc';
            lbl.style.color = '#000';
          }
        });
        event.target.style.backgroundColor = '#007BFF';
        event.target.style.borderColor = '#0066EE';
        event.target.style.color = '#fff';
      });
    });
  });