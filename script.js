const board = document.getElementById('board');
const message = document.getElementById('message');
const winnerElement = document.getElementById('winner');
const replayButton = document.getElementById('replay');
const cells = [];
let currentPlayer = 'X';
let isGameActive = true;

for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    board.appendChild(cell);
    cells.push(cell);

    cell.addEventListener('click', () => {
        if (isGameActive && !cell.textContent) {
            cell.textContent = currentPlayer;
            cell.classList.add(currentPlayer);
            checkWin();
            togglePlayer();
        }
    });
}

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            message.textContent = 'Winner:';
            winnerElement.textContent = currentPlayer;
            isGameActive = false;
            replayButton.style.display = 'block';
        }
    }

    if (!cells.some(cell => !cell.textContent)) {
        message.textContent = 'It\'s a draw!';
        isGameActive = false;
        replayButton.style.display = 'block';
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

replayButton.addEventListener('click', () => {
    // Clear the board
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('X', 'O');
    });

    // Reset game state
    message.textContent = '';
    winnerElement.textContent = '';
    currentPlayer = 'X';
    isGameActive = true;
    replayButton.style.display = 'none';
});
