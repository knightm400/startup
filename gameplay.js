window.addEventListener('DOMContentLoaded', (event) => {
    const playerName = localStorage.getItem('playerName') || 'Mystery Player';
    document.querySelector('.player-name').textContent = playerName;
});

const sequenceLength = 5;
const neonGreen = '#39FF14';
const pastelColors = {'pink': '#da74dcff','orange': '#f09c4aff','yellow': '#f7e460ff','blue': '#60b8f7ff','purple': '#ae60f7ff'};
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
    button.style.backgroundColor = color;
    return new Promise(resolve => {
        setTimeout(() => {
            button.style.backgroundColor = '';
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
    const playerName = localStorage.getItem('playerName') || 'Mystery Player';
    document.querySelector('.player-name').textContent = playerName;

    const showAgainBtn = document.querySelector('.game-buttons button:nth-child(2)');
    const startGameBtn = document.querySelector('.game-buttons button:nth-child(1)');

    showAgainBtn.disabled = true;

    let hasSequenceBeenShown = false;

    startGameBtn.addEventListener('click', () => {
        playSequence();
        hasSequenceBeenShown = true;
        showAgainBtn.disabled = false;
    });

    showAgainBtn.addEventListener('click', () => {
        if (hasSequenceBeenShown) {
            playSequence();
            showAgainBtn.disabled = true;
        }
    });

    document.querySelectorAll('td button').forEach((button, index) => {
        button.id = `button-${index}`;
    });


    let playerSequence = [];
    let gameActive = false;

    function playerTurn() {
        gameActive = true; 
        playerSequence = []; 
    }

    function checkPlayerSequence() {
        if (playerSequence.length === sequenceIds.length) {
            alert('Congratulations! You completed the sequence! Leveling up...');
            resetGame();
        }
    }

    async function flashPlayerSelection(buttonId) {
        const index = sequenceIds.indexOf(buttonId);
        if (index === -1 || !gameActive) return; 

        let flashColor;
        if (index === 0) {
            flashColor = neonGreen;
        } else if (index === sequenceIds.length - 1) {
            flashColor = 'red';
        } else {
            const colorKey = sequence[index];
            flashColor = pastelColors[colorKey];
        }

        await flashButton(buttonId, flashColor);

        playerSequence.push(buttonId);
        checkPlayerSequence();
    }

    document.querySelectorAll('td button').forEach(button => {
        button.addEventListener('click', () => {
            flashPlayerSelection(button.id);
        });
    });

    function resetGame() {
        gameActive = false;
        playerSequence = [];
        showAgainBtn.disabled = true;
        startGameBtn.disabled = false;
    }

    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Game';
    resetBtn.addEventListener('click', resetGame);
    document.querySelector('main').appendChild(resetBtn);

    startGameBtn.addEventListener('click', async () => {
        await playSequence();
        playerTurn(); 
        startGameBtn.disabled = true; 
        showAgainBtn.disabled = false;
    });

    showAgainBtn.addEventListener('click', async () => {
        await playSequence();
        playerTurn();
    });

});