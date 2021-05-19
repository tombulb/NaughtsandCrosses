//GLOBAL VARIABLES
var startVsPlayer = document.querySelector('.vs-player');
var startVsPc = document.querySelector('.vs-pc');
var gameSquares = null;
var showResults = document.querySelector('.results-div');
var turnCounter = 0;
var resultsArray = [];
var playAgainBtn = document.createElement('button');




// !GAME FUNCTIONALITY!

// // FUNCTION TO ADD ONE TO TURNCOUNTER() {
function addTurnCounter(){
    turnCounter = turnCounter + 1;
}

//determine if a clicked square should have an x or o and adds corresponding class to that square
function determineXO() {
    if (turnCounter % 2 === 0) {
        event.target.textContent = 'X';
        event.target.classList.add('clicked-x');
        showResults.textContent = "It's player ones turn";
        } else {
            event.target.textContent = 'O';
            event.target.classList.add('clicked-o');
            showResults.textContent = "It's player twos turn";
        }
}

// CHECKS FOR WINNING SCENARIO ON MOUSECLICK
function determineWinner(){
    for (var i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i][0].classList.contains('clicked-o') && resultsArray[i][1].classList.contains('clicked-o') && resultsArray[i][2].classList.contains('clicked-o') ){
            turnCounter = 10;
            showResults.textContent = 'Player one wins!';
            playAgain();
        } else if (resultsArray[i][0].classList.contains('clicked-x') && resultsArray[i][1].classList.contains('clicked-x') && resultsArray[i][2].classList.contains('clicked-x')){
            turnCounter = 10;
            showResults.textContent = ('Player two wins!')
            playAgain();
        } 
    }
}

// HANDLES DRAW SCENARIO
function itsADraw(){
    if (turnCounter === 9){
        showResults.textContent = "It's a draw";
        playAgain();
    }
}

//creates a button which resets the game on click
function playAgain(){
    if (turnCounter === 9 || turnCounter === 10){
        document.body.appendChild(playAgainBtn);
        playAgainBtn.innerText = 'Play Again?';
        playAgainBtn.classList.add('play-again-btn');
        playAgainBtn.addEventListener('click', resetGame);
    }
}

// resets game elements to default for a new game
function resetGame() {
    document.body.removeChild(playAgainBtn);
    for (var i = 0; i < gameSquares.length; i++){
        gameSquares[i].classList.remove('clicked-o', 'clicked-x');
        gameSquares[i].textContent = '';
        turnCounter = 0;
        showResults.textContent = "It's player ones turn";
        
    }
}


// EVALUATES IF THE TURN IS VALID, AND IF SQUARE SHOULD HAVE AN X OR O.
function turnTaken() {
    if (event.target.textContent === ''){ 
        if (turnCounter <= 9) { 
            addTurnCounter();
            determineXO();
            determineWinner();
            itsADraw();
        }
    }
}


// creates the 3x3 grid after an option is selected on start menu. adding classes and event listeners to each box
function createGrid() {
    for (var i = 1; i < 10; i++) {
        var createGrid = document.createElement('div');
        document.querySelector('.div-wrapper').appendChild(createGrid);
        createGrid.setAttribute('class', 'game-squares box' + i);
        var createdSquare = document.querySelector('.box' + i)
        createdSquare.addEventListener('click', handleClick);
        gameSquares = document.querySelectorAll('.game-squares');
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
function startPlayerGame(){
    document.querySelector('.vs-player').style.display = 'none';
    document.querySelector('.vs-pc').style.display = 'none';
    showResults.textContent = "It's player ones turn";
    createGrid();
    generateWinScenarios();    
}

// HANDLE SQUARE CLICKED EVENT
function handleClick() {
    turnTaken();  
}

startVsPlayer.addEventListener('click', startPlayerGame);

