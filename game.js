// PROGRAM STARTS WITH OPTION FOR USER TO SELECT A PLAYER OPPONENT OR PC OPPONENT
// AS PLAYERS CLICKS ON SQUARE IT SHOULD FILL WITH AN 'X' OR 'O'
// THE PROGRAM WAITS FOR EITHER ANOTHER CLICK ON A DIFFERENT SQUARE OR THE COMPUTER MAKES A CHOICE
// DETECTS IF SOMEONE HAS WON, OR IF THE GAME IS A DRAW
// DISPLAYS WINNER AND ASKS IF THE USER WOULD LIKE TO PLAY AGAIN


// !GAME FUNCTIONALITY!

// TURNCOUNTER
// turnCounter = 0; use odd or even formula to determine if, when a square is clicked, it should have an x or o. see lines 20 - 25

// // FUNCTION TO ADD ONE TO TURNCOUNTER() {
//     TURNCOUNTER = TURNCOUNTER + 1;
// }


// FUNCTION TO DISPLAY X OR O IN SQUARE() {
// line 20 allows turn to proceed only if the square is empty, preventing a player from changing the other players choice to their own.
//     IF (TARGET ELEMENT'S TEXT CONTENT IS EMPTY){
// line 22 allows the turn to proceed only if the turnCounter is less than 9, preventing the game from continuing if all the squares are filled.  
//         IF (TURN COUNTER IS LESS THAN 9){
//         -- addTurnCounter function here -- adds one to turnCounter if it it less than 9.                
// lines 25 - 30 determine if the square should have an x or an o
//             IF (TURN COUNTER IS ODD) {
//                 SQUARE CONTENT = X
//                 SQUARE CLASS = CLICKED BY PLAYER X
//             } ELSE(SQUARE CONTENT EVEN) {
//                 SQUARE CONTENT = O;
//                 SQUARE CLASS = CLICKED BY PLAYER O
//             }
//         }
//     }
// }

// FUNCTION FOR DRAW(){
//    IF (turnCounter === 9){
//       html element displays its a draw
//    }
// }

// ARRAY OF ARRAYS TO STORE ALL POSSIBLE WIN SCENARIOS
// var resultsArray = [[winscenario1], [winscenario2], etc.]
// WIN SCENARIOS ARE 1,2,3 - 1,5,9 - 1,4,7 - 2,5,8 - 3,6,9 - 4,5,6 - 7,5,3 - 7,8,9
// EG. IF SQUARES 1,2,3 HAVE THE CLASS 'CLICKED BY PLAYER X', PLAYER X WINS IF SQUARES 4,5,6 HAVE THE CLASS 'CLICKED BY PLAYER O', PLAYER O WINS. IF 9 TURNS TAKEN AND NO WINNER, DISPLAYS DRAW RESULT.

// FUNCTION TO CHECK IF THERE IS A WINNER() {
//     EVALUATE IF CERTAIN SQUARES HAVE A CLASS TO DETERMINE IF SOMEONE HAS WON
// for (var i = 0; i < resultsArray.length; i++){ - LOOPS THROUGH EACH ARRAY ELEMENT AT THE FIRST LEVEL,
// the below lines go through each item within the second level array to check if they have a corresponding player  class. if all 3 within that array have the same player class, that player wins. 
//     if (array[i][0] contains class 'clicked-o' && array[i][1] contains class 'clicked-o' && array[i][2] contains class 'clicked-o'){
//          turnCounter = 11; - PREVENTS GAME FROM CONTINUING PAST WIN SCENARIO
//          html element displays player-o wins
//     } else if (array[i][0] contains class 'clicked-x' && array[i][1] contains class 'clicked-x' && array[i][2] contains class 'clicked-x')
//          turnCounter = 11; 
//          html element displays player-x wins 
//}


// determine winner function sets turnCounter to 11 if a win scenario happens, preventing the game from continuing.

// FUNCTION handleClick() {
//     RUN FUNCTION TO DISPLAY X OR O IN SQUARE
// }

// function to add event listener to all 9 squares
// for (var i = 0; i < gameSquares.length; i++) {
//     gamesSquares[i].addEventListener('click', handleclick);
// }