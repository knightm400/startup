window.addEventListener('DOMContentLoaded', (event) => {
    const playerName = localStorage.getItem('playerName') || 'Mystery Player';
    document.querySelector('.player-name').textContent = playerName;
});