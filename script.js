/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector('.game--status');
const easterEggDisplay = document.querySelector('.game--easteregg')
let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
const easterEggMessage1 = () => `Hey, stop clicking me! Let ${currentPlayer} move!`;
const easterEggMesssage2 = () => `Iris is the best girlfriend ever!`;
let clickCount = 0;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
    /*
    We update our internal game state to reflect the played move, 
    as well as update the user interface to reflect the played move
    */
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    handleResultValidation();
}
function handlePlayerChange() {
    // player change
    if (currentPlayer == "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winConditiion = winningConditions[i]
        let a = gameState[winConditiion[0]];
        let b = gameState[winConditiion[1]];
        let c = gameState[winConditiion[2]];
        // empty cell found, continue the gaame
        if (a == '' || b == '' || c == '') {
            continue;
        }
        if (a == b && b == c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    /* 
    We will check whether there are any values in our game state array 
    that are still not populated with a player sign
    */
    let roundDraw = !gameState.includes(""); // if gameState does not have "", roundDraw
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    /*
    If we get to here we know that the no one won the game yet, 
    and that there are still moves to be played, so we continue by changing the current player.
    */
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    clickCount = 0;
    easterEggDisplay.innerHTML = "";
    /*
    We will save the clicked html element in a variable for easier further use
    */
    const clickedCell = clickedCellEvent.target;
    /*
    Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid. 
    Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an 
    integer(number)
    */
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
    /* 
    Next up we need to check whether the call has already been played, 
    or if the game is paused. If either of those is true we will simply ignore the click.
    */
    if (gameState[clickedCellIndex] != "" || !gameActive) {
        return;
    }
    /* 
    If everything if in order we will proceed with the game flow
    */
    handleCellPlayed(clickedCell, clickedCellIndex);

}

function handleRestartGame() {
    clickCount++;
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn;
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
    statusDisplay.innerHTML = currentPlayerTurn();
    if (clickCount == 5) {
        easterEggDisplay.innerHTML = easterEggMessage1();
    } else if (clickCount == 10) {
        easterEggDisplay.innerHTML = easterEggMesssage2();
    }
}
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);