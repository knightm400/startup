window.addEventListener('DOMContentLoaded', (event) => {
    const playerName = localStorage.getItem('playerName') || 'Mystery Player';
    document.querySelector('.player-name').textContent = playerName;
});

const sequenceLength = 5;
const neonGreen = '#39FF14';
const pastelColors = {'pink': '#da74dcff','orange': '#f09c4aff','yellow': '#f7e460ff','blue': '#60b8f7ff','purple': '#ae60f7ff','red': '#FF5C5C'};
const colors = Object.keys(pastelColors);
const sequence = ['green'];
const sequenceIds = ['button-0', 'button-6', 'button-12', 'button-18', 'button-24'];
let currentStep = 0;

while (sequence.length < sequenceLength) {
    let newColor;
    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (sequence.includes(newColor) || newColor === sequence[sequence.length - 1]);
    sequence.push(newColor);
}

function flashButton(buttonId, color, duration = 1000) {
    const button = document.querySelector(`#${buttonId}`);
    const originalColor = button.style.backgroundColor;
    button.style.backgroundColor = color;
    return new Promise(resolve => {
        setTimeout(() => {
            button.style.backgroundColor = originalColor;
            resolve();
        }, duration);
    });
}

async function playSequence() {
    await flashButton(sequenceIds[0], neonGreen, 600);
    await new Promise(resolve => setTimeout(resolve, 400));
    for (let i = 1; i < sequenceIds.length - 1; i++) {
        const colorKey = sequence[i % sequence.length];
        const pastelColor = pastelColors[colorKey];
        await flashButton(sequenceIds[i], pastelColor, 600);
        await new Promise(resolve => setTimeout(resolve, 400));
    }

    await flashButton(sequenceIds[sequenceIds.length - 1], 'red', 600);
    await new Promise(resolve => setTimeout(resolve, 400));
}

window.addEventListener('DOMContentLoaded', (event) => {
    const startGameBtn = document.querySelector('.game-buttons button');
    startGameBtn.addEventListener('click', () => {
        playSequence();
    });
    document.querySelectorAll('td button').forEach((button, index) => {
        button.id = `button-${index}`;
    });
});


