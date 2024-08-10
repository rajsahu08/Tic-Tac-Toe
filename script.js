const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset');
const startButton = document.getElementById('start-game');
const playerXInput = document.getElementById('player-x');
const playerOInput = document.getElementById('player-o');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let playerXName = 'Player X';
let playerOName = 'Player O';

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
};

const checkDraw = () => {
    return boardState.every(cell => cell);
};

const handleClick = (e) => {
    const cell = e.target;
    const index = Array.from(cells).indexOf(cell);

    if (boardState[index] || checkWin()) return;

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        status.textContent = `${currentPlayer === 'X' ? playerXName : playerOName} wins!`;
        cells.forEach(cell => cell.removeEventListener('click', handleClick));
    } else if (checkDraw()) {
        status.textContent = `It's a draw!`;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        status.textContent = `Player ${currentPlayer === 'X' ? playerXName : playerOName}'s turn`;
        highlightCurrentPlayer();
    }
};

const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    status.textContent = `Player ${playerXName}'s turn`;
    highlightCurrentPlayer();
    cells.forEach(cell => cell.addEventListener('click', handleClick));
};

const highlightCurrentPlayer = () => {
    const xLabel = document.querySelector('label[for="player-x"]');
    const oLabel = document.querySelector('label[for="player-o"]');
    
    xLabel.style.fontWeight = currentPlayer === 'X' ? 'bold' : 'normal';
    xLabel.style.color = currentPlayer === 'X' ? '#ff5722' : '#555';
    oLabel.style.fontWeight = currentPlayer === 'O' ? 'bold' : 'normal';
    oLabel.style.color = currentPlayer === 'O' ? '#2196F3' : '#555';
};

const startGame = () => {
    playerXName = playerXInput.value.trim() || 'Player X';
    playerOName = playerOInput.value.trim() || 'Player O';
    
    if (!playerXName || !playerOName) {
        status.textContent = 'Please enter names for both players.';
        return;
    }
    
    document.querySelector('.player-names').classList.add('hidden');
    board.classList.remove('hidden');
    resetButton.classList.remove('hidden');
    startButton.classList.add('hidden');
    
    status.textContent = `Player ${playerXName}'s turn`;
    highlightCurrentPlayer();
    cells.forEach(cell => cell.addEventListener('click', handleClick));
};

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);