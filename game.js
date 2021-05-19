// PROGRAM STARTS WITH OPTION FOR USER TO SELECT A PLAYER OPPONENT OR PC OPPONENT
// AS PLAYERS CLICKS ON SQUARE IT SHOULD FILL WITH AN 'X' OR 'O'
// THE PROGRAM WAITS FOR EITHER ANOTHER CLICK ON A DIFFERENT SQUARE OR THE COMPUTER MAKES A CHOICE
// DETECTS IF SOMEONE HAS WON, OR IF THE GAME IS A DRAW
// DISPLAYS WINNER AND ASKS IF THE USER WOULD LIKE TO PLAY AGAIN


//GLOBAL VARIABLES
var gameSquares = document.querySelectorAll('.game-squares');//represents all 9 squares as a group
var showResults = document.querySelector('.results-div');//represents where game results will be shown
var turnCounter = 0;
// ARRAY OF ARRAYS CONTAIN EACH POSSIBLE WINNING OUTCOME
var resultsArray = [
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
]

// !GAME FUNCTIONALITY!

// TURNCOUNTER
// turnCounter = 0; use odd or even formula to determine if, when a square is clicked, it should have an x or o. see lines 20 - 25

// // FUNCTION TO ADD ONE TO TURNCOUNTER() {
function addTurnCounter(){
    turnCounter = turnCounter + 1;
}

//determine if a clicked square should have an x or o and adds corresponding class to that square
function determineXO() {
    if (turnCounter % 2 === 0) {
        event.target.textContent = 'X';
        event.target.classList.add('clicked-x');
        } else {
            event.target.textContent = 'O';
            event.target.classList.add('clicked-o')
        }
}

// CHECKS FOR WINNING SCENARIO ON MOUSECLICK
//lines 81 and 84 are checking to see if any win scenarios are true
function determineWinner(){
    for (var i = 0; i < resultsArray.length; i++) {
        if (resultsArray[i][0].classList.contains('clicked-o') && resultsArray[i][1].classList.contains('clicked-o') && resultsArray[i][2].classList.contains('clicked-o') ){
            turnCounter = 11;
            showResults.textContent = 'Player1 wins';
        } else if (resultsArray[i][0].classList.contains('clicked-x') && resultsArray[i][1].classList.contains('clicked-x') && resultsArray[i][2].classList.contains('clicked-x')){
            turnCounter = 11;
            showResults.textContent = ('Player 2 wins')
        } 
    }
}

// HANDLES DRAW SCENARIO
function itsADraw(){
    if (turnCounter === 9){
        showResults.textContent = "It's a draw";
    }
}

// EVALUATES IF THE TURN IS VALID, AND IF SQUARE SHOULD HAVE AN X OR O.
function turnTaken() {
    if (event.target.textContent === ''){ // if square is empty
        if (turnCounter <= 9) { //if turnCounter is less than 9
            addTurnCounter(); //add one to turnCounter
            determineXO(); // determine if square should have X or O
            determineWinner(); //function runs to check what classes the squares have and will stop the game if it detects a win
            itsADraw(); // if the previous function doesn't find a winner after 9 turns (turnCounter === 9), displays its a draw
        }
    }
}

// HANDLE SQUARE CLICKED EVENT or turn taken
function handleClick() {
    turnTaken();  
}

//ADDS EVENT LISTENER TO ALL 9 SQUARES
for ( var i = 0; i < gameSquares.length; i++ ) {
    gameSquares[i].addEventListener('click', handleClick);
}
