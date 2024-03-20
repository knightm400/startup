const neonGreen = '#39FF14';
const pastelColors = {'pink': '#ee4dbbff','orange': '#f09c4aff','yellow': '#f7e460ff','blue': '#60b8f7ff','purple': '#9a4deeff'};
const colors = Object.keys(pastelColors);
let colorSequence = [];
let sequenceIds = [];
let playerIndex = 0;
let currentLevel = 1;

// adds new randomized colors to sequence
function generateColorsForLevel(level) {
    colorSequence = [neonGreen];
    while (colorSequence.length < level + 3) {
        let newColor;
        do {
            newColor = colors[Math.floor(Math.random() * colors.length)];
        } while (colorSequence.includes(newColor) || newColor === colorSequence[colorSequence.length - 1] || newColor === 'red');
        colorSequence.push(newColor)
    }
    colorSequence.push('red');

    return colorSequence;
}

function generateSequenceForLevel(level) {
    sequenceIds = [];
    // Level 1 sequence generated
    if (level === 1) {
        sequenceIds = ['button-0', 'button-6', 'button-12', 'button-18', 'button-24'];
    } else {
        let path = [{ row: 0, col: 0 }];
        const directions = [
            {row: 1, col: 0}, {row: 0, col: 1},  
            {row: 1, col: 1},                    
            {row: -1, col: 1},                  
            {row: 1, col: -1}                   
        ];

        while (path.length < level + 4) {
            let lastCell = path[path.length - 1];
            let potentialCells = [];

            directions.forEach(direction => {
                const newRow = lastCell.row + direction.row;
                const newCol = lastCell.col + direction.col;

                if (newRow >= 0 && newRow < 5 && newCol >= 0 && newCol < 5 &&
                    !path.some(cell => cell.row === newRow && cell.col === newCol)) {
                    potentialCells.push({ row: newRow, col: newCol });
                }
            });

            if (potentialCells.length > 0) {
                const nextCell = potentialCells[Math.floor(Math.random() * potentialCells.length)];
                path.push(nextCell);
            } else {
                break; 
            }
        }

        // Convert sequence of cell positions to button IDs.
        sequenceIds = path.map(cell => `button-${cell.row * 5 + cell.col}`);
    }

    return sequenceIds;
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
    buttons.forEach(button => button.style.backgroundColor = 'red');
    await new Promise(resolve => setTimeout(resolve, 1000));
    buttons.forEach(button => button.style.backgroundColor = '');
}

async function playSequence() {
    sequenceIds = generateSequenceForLevel(currentLevel);
    colorSequence = generateColorsForLevel(currentLevel);
    for (let i = 0; i < sequenceIds.length; i++) {
        const color = colorSequence[i];
        const displayColor = (color === neonGreen || color === 'red') ? color : pastelColors[color];
        await flashButton(sequenceIds[i], displayColor, 600);
        await new Promise(resolve => setTimeout(resolve, 400));
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    const playerName = localStorage.getItem('playerName') || 'Mystery Player';
    document.querySelector('.player-name').textContent = playerName;

    const showAgainBtn = document.querySelector('.game-buttons button:nth-child(2)');
    const startGameBtn = document.querySelector('.game-buttons button:nth-child(1)');

    showAgainBtn.disabled = true;
    let hasSequenceBeenShown = false;
    let gameActive = false;
    let playerSequence = [];

    startGameBtn.addEventListener('click', () => {
        document.getElementById('count').value = currentLevel;
        playSequence();
        hasSequenceBeenShown = true;
        showAgainBtn.disabled = false;
        gameActive = true;
    });

    showAgainBtn.addEventListener('click', () => {
        if (hasSequenceBeenShown) {
            playSequence();
            showAgainBtn.disabled = true;
        }
    });

    document.querySelectorAll('td button').forEach(button => {
        button.addEventListener('click', () => {
            flashPlayerSelection(button.id);
        })
    })

    function resetGame() {
        gameActive = false;
        playerIndex = 0;
        playerSequence =[];
        showAgainBtn.diabled = true;
        startGameBtn.diabled = false;
    }

    async function flashPlayerSelection(buttonId) {
        showAgainBtn.disabled = true;
        if (!gameActive) return;

        const playerIndex = playerSequence.length;
        let flashColor;
        
        if (sequenceIds[playerIndex] !== buttonId) {
            await flashAllRed();
            alert('GAME OVER. You selected the wrong square. Press OK to start over.');
            resetGame();
            return;
        }

        if (playerIndex === 0) {
            flashColor = neonGreen;
        } else if (playerIndex === sequenceIds.length - 1){
            flashColor = 'red';
        } else {
            flashColor = pastelColors[colorSequence[playerIndex]];
        }

        flashButton(buttonId, flashColor, 600);
        playerSequence.push(buttonId);

        if (playerSequence.length === sequenceIds.length) {
            alert('Well done! You completed the sequence! Levelling up...');
            currentLevel++;
            document.getElementById('count').value = currentLevel;
            playSequence();
        }

    }
})


