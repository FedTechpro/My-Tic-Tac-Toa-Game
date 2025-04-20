// Get references to DOM elements
const gameBoard = document.getElementById('gameBoard');
const restartBtn = document.getElementById('restartBtn');
const boxes = document.querySelectorAll('.box');

// Create a status bar
const statusBar = document.createElement('div');
statusBar.id = 'statusBar';
statusBar.textContent = "Current Player: X"; // Initial status
statusBar.style.marginTop = '20px';
statusBar.style.textAlign = 'center';
statusBar.style.fontSize = '1.2rem';
statusBar.style.fontWeight = 'bold';
document.body.insertBefore(statusBar, gameBoard.nextSibling);

// Create a scoreboard
const scoreBoard = document.createElement('div');
scoreBoard.id = 'scoreBoard';
scoreBoard.style.marginTop = '10px';
scoreBoard.style.textAlign = 'center';
scoreBoard.style.fontSize = '1rem';
scoreBoard.style.fontWeight = 'bold';
document.body.insertBefore(scoreBoard, statusBar.nextSibling);

// Collect player names
const player1 = prompt("Enter Player 1 name (X):") || "Player 1";
const player2 = prompt("Enter Player 2 name (O):") || "Player 2";

// Initialize score counters
let player1Wins = 0;
let player2Wins = 0;
let draws = 0;

// Update scoreboard function
const updateScoreBoard = () => {
    scoreBoard.textContent = `${player1} (X): ${player1Wins} wins     |       ${player2} (O): ${player2Wins} wins   |    Draws: ${draws}`;
};
updateScoreBoard();

// Define variables to track game state
let currentPlayer = 'X'; // 'X' starts the game
let board = ['', '', '', '', '', '', '', '', '']; // Array to store the board state
let isGameActive = true; // Boolean to check if the game is still active

// Winning combinations based on the grid positions
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6]  // Diagonal from top-right to bottom-left
];

// Function to handle a player's move
const handleBoxClick = (event) => {
    const box = event.target; // Get the clicked box element
    const boxIndex = parseInt(box.id); // Get the index of the clicked box

    // Check if the box is already occupied or the game is over
    if (board[boxIndex] !== '' || !isGameActive) {
        return;
    }

    // Update the board state and the UI
    board[boxIndex] = currentPlayer; // Mark the box with the current player's symbol
    box.textContent = currentPlayer; // Display the player's symbol in the box

    // Check if the current move wins the game
    if (checkWin()) {
        const winnerName = currentPlayer === 'X' ? player1 : player2;
        statusBar.textContent = `${winnerName} (${currentPlayer}) wins!`; // Update the status bar
        if (currentPlayer === 'X') {
            player1Wins++;
        } else {
            player2Wins++;
        }
        updateScoreBoard();
        isGameActive = false; // End the game
        setTimeout(resetGame, 2000); // Automatically restart the game after 2 seconds
        return;
    }

    // Check if the board is full (draw)
    if (board.every(cell => cell !== '')) {
        statusBar.textContent = 'It\'s a draw!'; // Update the status bar
        draws++;
        updateScoreBoard();
        isGameActive = false; // End the game
        setTimeout(resetGame, 2000); // Automatically restart the game after 2 seconds
        return;
    }

    // Switch to the next player
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    const nextPlayerName = currentPlayer === 'X' ? player1 : player2;
    statusBar.textContent = `Current Player: ${nextPlayerName} (${currentPlayer})`; // Update the status bar
};

// Function to check if the current player has won
const checkWin = () => {
    return winningCombinations.some(combination => {
        // Check if all boxes in the combination belong to the current player
        return combination.every(index => board[index] === currentPlayer);
    });
};

// Function to reset the game
const resetGame = () => {
    // Reset the game state
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    currentPlayer = 'X';

    // Clear the UI
    boxes.forEach(box => {
        box.textContent = ''; // Remove any text from the boxes
    });

    // Reset the status bar
    statusBar.textContent = `Current Player: ${player1} (X)`;
};

// Attach event listeners to each box
boxes.forEach(box => {
    box.addEventListener('click', handleBoxClick); // Handle box clicks
});

// Attach event listener to the restart button
restartBtn.addEventListener('click', resetGame); // Restart the game when the button is clicked
