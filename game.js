//GLOBAL VARIABLES
var startVsPlayer = document.querySelector('.vs-player');
var grid1 = document.querySelector('.grid1');
var btnContainer = document.querySelector('.btn-container');
var showResults = document.querySelector('.messages-div');
var quitBtn = document.createElement('button');
var playerOneIsX = document.querySelector('.player-is-x');
var playerOneIsO = document.querySelector('.player-is-o');
var mainMenu = document.querySelector('.main-menu-wrapper');
var playAgainBtn = document.querySelector('.play-again-btn');
var mainMenuBtn = document.querySelector('.main-menu-btn');
var whosTurn = document.querySelector('.your-turn');
var player1 = '';
var player2 = '';
var gameSquares = null;
var turnCounter = 0;
var drawCounter = 9;
var resultsArray = [];





// !GAME FUNCTIONALITY!
// // FUNCTION TO ADD ONE TO TURNCOUNTER() {
function addTurnCounter(){
    turnCounter = turnCounter + 1;
}

//determine if a clicked square should have an x or o and adds corresponding class to that square
function determineXO() {
    if (turnCounter % 2 === 0) {
        event.target.innerHTML = '<img class="token" src="resources/x-token-small.jpg" alt="X"></img>';
        event.target.classList.add('clicked-x');
        whosTurn.textContent = `It's ${player2}s turn`;
        } else {
            event.target.innerHTML = '<img class="token" src="resources/o-token-small.jpg" alt="X"></img>';
            event.target.classList.add('clicked-o');
            whosTurn.textContent = `It's ${player1}s turn`;
        }
}

// CHECKS FOR WINNING SCENARIO ON MOUSECLICK
function determineWinner(){
    for (var i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i][0].classList.contains('clicked-o') && resultsArray[i][1].classList.contains('clicked-o') && resultsArray[i][2].classList.contains('clicked-o') ){
            turnCounter = 11;
            whosTurn.textContent = `${player2} wins!`;
        } else if (resultsArray[i][0].classList.contains('clicked-x') && resultsArray[i][1].classList.contains('clicked-x') && resultsArray[i][2].classList.contains('clicked-x')){
            turnCounter = 11;
            whosTurn.textContent = (`${player1} wins!`)
        } 
    }
}

// HANDLES DRAW SCENARIO
function determineDraw(){
    if (turnCounter === drawCounter){
        whosTurn.textContent = "It's a draw";
    }
}

//creates a play again button which resets the game on click and a return to menu button which quits the game
function createPlayAgainMainMenuBtns(){
    btnContainer.classList.toggle('display-none');
    playAgainBtn.addEventListener('click', resetGame);
    mainMenuBtn.addEventListener('click', quitGame);
}

// resets game elements to default for a new game
function resetGame() {
    for (var i = 0; i < gameSquares.length; i++){
        gameSquares[i].classList.remove('clicked-o', 'clicked-x');
        gameSquares[i].textContent = '';
        if (drawCounter === 9 ) {
            turnCounter = 0;
        } else if (drawCounter === 10 ) {
            turnCounter = 1;
        }
        whosTurn.textContent = "It's Player 1s turn";        
    }
}

function quitGame() {
    destroyGrid();
    grid1.classList.toggle('div-wrapper');
    showResults.classList.toggle('display-none');
    whosTurn.classList.toggle('display-none');
    mainMenu.classList.toggle('display-none');
    btnContainer.classList.toggle('display-none');
    whosTurn.textContent = "It's Player 1s turn";
    turnCounter = 0;
}

// EVALUATES IF THE TURN IS VALID, AND IF SQUARE SHOULD HAVE AN X OR O.
function turnTaken() {
    if (event.target.textContent === ''){ 
        if (turnCounter <= 9) { 
            addTurnCounter();
            determineXO();
            determineWinner();
            determineDraw();
        }
    }
}


// creates the 3x3 grid after an option is selected on start menu. adding classes and event listeners to each box
function createGameBoard() {
    createPlayAgainMainMenuBtns();
    showResults.classList.toggle('display-none');
    whosTurn.classList.toggle('display-none');
    mainMenu.classList.toggle('display-none'); 
    grid1.classList.toggle('div-wrapper');
    for (var i = 1; i < 10; i++) {
        var createGrid = document.createElement('div');
        grid1.appendChild(createGrid);
        createGrid.setAttribute('class', 'game-squares box' + i);
        var createdSquare = document.querySelector('.box' + i)
        createdSquare.addEventListener('click', handleClick);
        gameSquares = document.querySelectorAll('.game-squares');
    }
}

// removes the grid
function destroyGrid() {
    for (var i = 0; i < 9; i++){
    gameSquares[i].remove();
    }
}

// fills the resultsArray with all possible win scenarios
function generateWinScenarios(){
    resultsArray = 
    [
        [
            document.querySelector('.box1'),
            document.querySelector('.box2'),
            document.querySelector('.box3')
        ],
        [
            document.querySelector('.box1'),
            document.querySelector('.box5'),
            document.querySelector('.box9')
        ],
        [
            document.querySelector('.box1'),
            document.querySelector('.box4'),
            document.querySelector('.box7')
        ],
        [
            document.querySelector('.box2'),
            document.querySelector('.box5'),
            document.querySelector('.box8')
        ],
        [
            document.querySelector('.box3'),
            document.querySelector('.box6'),
            document.querySelector('.box9')
        ],
        [
            document.querySelector('.box4'),
            document.querySelector('.box5'),
            document.querySelector('.box6')
        ],
        [
            document.querySelector('.box7'),
            document.querySelector('.box5'),
            document.querySelector('.box3')
        ],
        [
            document.querySelector('.box7'),
            document.querySelector('.box8'),
            document.querySelector('.box9')
        ]
    ];
}

// hides start menu buttons and initiates creation of grid and win scenarios.
function startPlayerX(){
    createGameBoard();
    generateWinScenarios();
    turnCounter = 1;
    drawCounter= 10;
    player1 = 'Player 1';
    player2 = 'Player 2';  
}

function startPlayerO(){
    createGameBoard();
    generateWinScenarios();
    player1 = 'Player 2';
    player2 = 'Player 1';
}

// HANDLE SQUARE CLICKED EVENT
function handleClick() {
    turnTaken();  
}

playerOneIsX.addEventListener('click', startPlayerX);
playerOneIsO.addEventListener('click', startPlayerO);