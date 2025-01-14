const categories = {
    A: [
        { name: "A1. Crucifixo+ supino reto",           sets: 4, reps: "12x12", rest: 60 },
        { name: "A2. Crucifixo inclinado Máq ",         sets: 4, reps: "12", rest: 60 },
        { name: "A3. Voador peitoral",                  sets: 4, reps: "12-10", rest: 60 },
        { name: "A4. Cross over(polia alta)",           sets: 4, reps: "12", rest: 60 },
        { name: "A5. Remada alta + elevação múltipla",  sets: 4, reps: "15-12", rest: 60 },
        { name: "A6. Pulley corda",                     sets: 4, reps: "1x20 / 2x15 / 1x1x12", rest: 60 },
        { name: "A7. Tríceps testa + coice",            sets: 4, reps: "15-12", rest: 60 }
    ],
    B: [
        { name: "B1. Agachamento livre ",               sets: 2, reps: "15x12", rest: 90 },
        { name: "B2. Hack 45⁰",                         sets: 4, reps: "15", rest: 90 },
        { name: "B3. Leg 45⁰",                          sets: 3, reps: "15", rest: 90 },
        { name: "B4. Extensora",                        sets: 4, reps: "12+10+8", rest: 90 },
        { name: "B5. Cadeira flexora",                  sets: 3, reps: "15/3-tempo", rest: 90 },
        { name: "B6. Flexora Horizontal",               sets: 2, reps: "20 unilateral + 15 bilalateral", rest: 90 },
    ],
    C: [
        { name: "C1. Puxador alto (barra australiana)", sets: 4, reps: "15 - Progressão de carga", rest: 60 },
        { name: "C2. Remada sentada",                   sets: 4, reps: "15", rest: 60 },
        { name: "C3. Remada curvada máquina (P+N) ",    sets: 4, reps: "15", rest: 60 },
        { name: "C4. Voador dorsal ",                   sets: 4, reps: "15", rest: 60 },
        { name: "C5. Rosca direta (W)",                 sets: 4, reps: "1x20 + 3x12", rest: 60 },
        { name: "C6. Rosca inversa + martelo ",         sets: 4, reps: "15", rest: 60 },
    ],
};

const categoriesContainer = document.getElementById('categories');
const alertSound = document.getElementById('alert-sound');

function createExerciseElement(exercise) {
    const exerciseDiv = document.createElement('div');
    exerciseDiv.classList.add('exercise');

    const header = document.createElement('div');
    header.classList.add('header');

    const details = document.createElement('div');
    details.innerHTML = `<strong>${exercise.name}</strong> - ${exercise.sets} sets of ${exercise.reps}`;
    header.appendChild(details);

    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Expandir';
    toggleButton.classList.add('start');

    header.appendChild(toggleButton);
    exerciseDiv.appendChild(header);

    const sublist = document.createElement('div');
    sublist.classList.add('sublist');
    sublist.style.display = 'none';

    for (let i = 1; i <= exercise.sets; i++) {
        const setDiv = document.createElement('div');
        setDiv.classList.add('set');

        const label = document.createElement('label');
        label.textContent = `Repetição ${i}`;
        setDiv.appendChild(label);

        // const checkbox = document.createElement('input');
        // checkbox.type = 'checkbox';
        // setDiv.appendChild(checkbox);

        const timer = document.createElement('span');
        timer.classList.add('timer');
        timer.textContent = `Rest: ${exercise.rest}s`;
        setDiv.appendChild(timer);

        const startButton = document.createElement('button');
        startButton.textContent = 'Tempo';
        startButton.classList.add('start');

        let timerInterval;
        startButton.addEventListener('click', () => {
            let remainingTime = exercise.rest;
            timer.textContent = `Tempo: ${remainingTime}s`;

            clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                remainingTime--;
                timer.textContent = `Tempo: ${remainingTime}s`;

                if (remainingTime <= 0) {
                    clearInterval(timerInterval);
                    timer.textContent = `Acabou⏳!`;
                    alertSound.play(); // Play sound
                    alertSound.onended = () => {
                        alert('Próxima repetição.');
                    };
                }
            }, 1000);
        });

        setDiv.appendChild(startButton);
        sublist.appendChild(setDiv);
    }

    exerciseDiv.appendChild(sublist);

    toggleButton.addEventListener('click', () => {
        if (sublist.style.display === 'none') {
            sublist.style.display = 'block';
            toggleButton.textContent = 'Mininizar';
        } else {
            sublist.style.display = 'none';
            toggleButton.textContent = 'Expand';
        }
    });

    return exerciseDiv;
}

function loadCategories() {
    Object.keys(categories).forEach(categoryName => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('exercise-category');

        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = `Categoria ${categoryName}`;
        categoryDiv.appendChild(categoryTitle);

        categories[categoryName].forEach(exercise => {
            const exerciseElement = createExerciseElement(exercise);
            categoryDiv.appendChild(exerciseElement);
        });

        categoriesContainer.appendChild(categoryDiv);
    });
}

document.getElementById('reset-all').addEventListener('click', () => {
    document.querySelectorAll('.exercise').forEach(exercise => {
        exercise.classList.remove('completed');
        const timers = exercise.querySelectorAll('.timer');
        timers.forEach(timer => {
            const exerciseName = exercise.querySelector('strong').textContent;
            const exerciseData = Object.values(categories).flat().find(e => e.name === exerciseName);
            if (exerciseData) {
                timer.textContent = `Rest: ${exerciseData.rest}s`;
            }
        });
    });
});

loadCategories();
