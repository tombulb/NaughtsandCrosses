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
var headingContainer = document.querySelector('.heading-container');
var winCounter1 = document.querySelector('.win-counter1');
var winCounter2 = document.querySelector('.win-counter2');


// SOUNDS
var muteBtn = document.querySelector('.mute-btn');
var mute = 0;
var introRiff = document.querySelector('.intro-riff');
var gameStartXFill = document.querySelector('.game-start-x-fill');
var gameStartOFill = document.querySelector('.game-start-o-fill');
var randomSounds = [
    document.querySelector('.random1'),
    document.querySelector('.random2'),
    document.querySelector('.random3'),
    document.querySelector('.random4'),
    document.querySelector('.random5'),
    document.querySelector('.random6'),
]
var drawFill = document.querySelector('.draw');
var player1WinsFill = document.querySelector('.player-1-wins');
var player2WinsFill = document.querySelector('.player-2-wins');
var playAgainFill = document.querySelector('.play-again-fill');

muteBtn.addEventListener('click', playMenuRiff);
playerOneIsX.addEventListener('click', playStartXFill);
playerOneIsO.addEventListener('click', playStartOFill);

function playMenuRiff() {
    if (mute === 0){
        introRiff.play();
        mute++
    } else {
        introRiff.pause();
        mute--;
    }
}

function playStartXFill(){
    gameStartXFill.play();
}

function playStartOFill(){
    gameStartOFill.play();
}

function playRandomSound() {
    var i = Math.floor(Math.random() * randomSounds.length);
    randomSounds[i].play();
}

function playDrawFill() {
    drawFill.play();
}

function oWinsFill(){
    player1WinsFill.play();
}

function xWinsFill(){
    player2WinsFill.play();
}

function playAgainfill(){
    playAgainFill.play();
}

var newGame = true;
var player1 = '';
var player2 = '';
var player1Wins = 0;
var player2Wins = 0;
var gameSquares = null;
var turnCounter = 0;
var drawCounter = 9;
var resultsArray = [];


var upDown = '';
var headingInterval = null;

function pageOpens() {
    var heading = document.querySelector('.heading');
    var pos = 0;
    clearInterval(headingInterval);
    headingInterval = setInterval(frame, 10);
    function frame() {
        if (pos / 200 % 2 === 1){
            upDown = 1;
        } else if (pos / 200 % 2 === 0){
            upDown = 0;    
        }
        if ( upDown === 1 ) {
            heading.style.top = pos + 'px';
            pos--;
        } else if (upDown === 0) {
            heading.style.top = pos + 'px';
            pos++; 
        }
    }
}    



// !GAME FUNCTIONALITY!
// // FUNCTION TO ADD ONE TO TURNCOUNTER() {
function addTurnCounter(){
    turnCounter = turnCounter + 1;
}

//determine if a clicked square should have an x or o and adds corresponding class to that square
function determineXO() {
    addTurnCounter();
    playRandomSound();
    if (turnCounter % 2 === 0){
        event.target.innerHTML = '<img class="slide-in-bck-center token" src="resources/x-token-small.jpg" alt="X"></img>';
        event.target.classList.add('clicked-x');
        whosTurn.textContent = `It's ${player2}s turn`;
    } else {
        event.target.innerHTML = '<img class="slide-in-bck-center token" src="resources/o-token-small.jpg" alt="X"></img>';
        event.target.classList.add('clicked-o');
        whosTurn.textContent = `It's ${player1}s turn`;
        }
}

// CHECKS FOR WINNING SCENARIO ON MOUSECLICK
function determineWinner(){
    for (var i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i][0].classList.contains('clicked-o') && resultsArray[i][1].classList.contains('clicked-o') && resultsArray[i][2].classList.contains('clicked-o') ){
            oWinsFill();
            turnCounter = 11;
            if (player1 === 'Player 1') {
                player2Wins = player2Wins + 1;
                winCounter2.textContent = `Player 2 wins: ${player2Wins}`;
            } else {
                player1Wins = player1Wins + 1;
                winCounter1.textContent = `Player 1 wins: ${player1Wins}`;    
            }
            
            whosTurn.textContent = `${player2} wins!`;
        } else if (resultsArray[i][0].classList.contains('clicked-x') && resultsArray[i][1].classList.contains('clicked-x') && resultsArray[i][2].classList.contains('clicked-x')){
            turnCounter = 11;
            xWinsFill();
            if (player1 === 'Player 1') {
                player1Wins = player1Wins + 1;
                winCounter1.textContent = `Player 1 wins: ${player1Wins}`;
            } else {
                player2Wins = player2Wins + 1;
                winCounter2.textContent = `Player 2 wins: ${player2Wins}`;    
            }
            whosTurn.textContent = (`${player1} wins!`)
        } 
    }
}

// HANDLES DRAW SCENARIO
function determineDraw(){
    if (turnCounter === drawCounter){
        playDrawFill()
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
    playAgainfill();
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
    headingContainer.classList.toggle('display-none');
    whosTurn.textContent = "It's Player 1s turn";
    upDown = 0;
    turnCounter = 0;
    drawCounter= 9;
}

// EVALUATES IF THE TURN IS VALID, AND IF SQUARE SHOULD HAVE AN X OR O.
function turnTaken() {
    if (event.target.classList.contains('token')){
    } else { 
        if (turnCounter <= 9) { 
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
    headingContainer.classList.toggle('display-none');
    grid1.classList.toggle('div-wrapper');
    upDown = 3;
    player1Wins = 0;
    player2Wins = 0;
    winCounter1.textContent = 'Player 1 wins: 0';
    winCounter2.textContent = 'Player 2 wins: 0';
    for (var i = 1; i < 10; i++) {
        var createGrid = document.createElement('div');
        grid1.appendChild(createGrid);
        createGrid.setAttribute('class', 'slide-in-bck-center game-squares box' + i);
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
    introRiff.pause();
    mute--;
    createGameBoard();
    generateWinScenarios();
    turnCounter = 1;
    drawCounter= 10;
    player1 = 'Player 1';
    player2 = 'Player 2';  
}

function startPlayerO(){
    introRiff.pause();
    mute--;
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
pageOpens();