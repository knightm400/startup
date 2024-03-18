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
let currentLevel = 1;

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

async function flashAllRed() {
    const buttons = document.querySelectorAll('td button');
    buttons.forEach(button => {
        button.style.backgroundColor = 'red';
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    buttons.forEach(button => {
        button.style.backgroundColor = '';
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
        if (currentStep == sequenceLength) {
            alert('Congratulations! You completed the sequence! Leveling up...');
            currentLevel++;
            document.getElementById('count').value = currentLevel;
            resetGame(true);
        }
    }

    async function flashPlayerSelection(buttonId) {
        
        const index = sequenceIds.indexOf(buttonId);
        if (!gameActive || !document.querySelector(`#${buttonId}`)) return;

        if (sequenceIds[currentStep] !== buttonId) {
            await flashAllRed();
            alert("GAME OVER. You selected the wrong square.")
            resetGame(false);
            return;
        }

        let flashColor;
        if (currentStep === 0) {
            flashColor = neonGreen;
        } else if (currentStep === sequenceLength - 1) {
            flashColor = 'red'; 
        } else {
            flashColor = pastelColors[sequence[currentStep]]; 
        }


        flashButton(buttonId, flashColor, 600);

        currentStep++;
        checkPlayerSequence();
    }


    document.querySelectorAll('td button').forEach(button => {
        button.addEventListener('click', () => {
            flashPlayerSelection(button.id);
        });
    });

    function resetGame(successfulCompletion) {
        gameActive = false;
        currentStep = 0;
        playerSequence = [];
        showAgainBtn.disabled = true;
        startGameBtn.disabled = false;
        startGameBtn.textContent = 'Start Game';
        hasSequenceBeenShown = false;

        if (!successfulCompletion) {
        currentLevel = 1;
        document.getElementById('count').value = "--";
        }

        const existingMessage = document.getElementById("gameOverMessage");
        if (existingMessage) {
            existingMessage.remove();
        }
}
    const resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset Game';
    resetBtn.addEventListener('click', resetGame);
    document.querySelector('main').appendChild(resetBtn);

    startGameBtn.addEventListener('click', async () => {
        document.getElementById('count').value = currentLevel;
        await playSequence();
        playerTurn(); 
        startGameBtn.textContent = 'Reset Game';
        startGameBtn.disabled = true; 
        showAgainBtn.disabled = false;
    });

    showAgainBtn.addEventListener('click', async () => {
        await playSequence();
        playerTurn();
    });

});