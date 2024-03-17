function login() {
    var playerName = document.getElementById('name').value;
    if (playerName) {
        localStorage.setItem('playerName', playerName);
        window.location.href = 'gameplay.html';
    } else {
        alert('Please enter your name.');
    }
}