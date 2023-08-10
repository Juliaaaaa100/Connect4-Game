























































// // this 2d array represents the game board.
// // keeps track of the positions of the discs placed by both players
// let gameField = new Array()


// // This variable stores a reference to the HTML element
// // with the ID "game-table," which is the game board's container.
// let board =  document.getElementById( "game-table")


// // These variables keep track of the current 
// // column and row where the next disc will be placed
// // as well as the current player's turn

// let currentCol
// let currentRow
// let currentPlayer


// // this variable is used to assign a unique ID to each disc placed on the board.
// let id =  1


// newgame()

// function  newgame(){
//   prepareField() // // This function initializes the game by calling prepareField() 
//   placeDisc(Math.floor(Math.random()*2)+1)  //  place the first disc randomly for either Player 1 or Player 2.
// }

// // set up the game board by initializing a 2d array
// // [
//  //[0, 0, 0, 0, 0, 0, 0],
// //  [0, 0, 0, 0, 0, 0, 0],
// //  [0, 0, 0, 0, 0, 0, 0],
// //  [0, 0, 0, 0, 0, 0, 0],
// //  [0, 0, 0, 0, 0, 0, 0],
// //  [0, 0, 0, 0, 0, 0, 0]
// // ]

// function prepareField(){
//     gameField = new Array() // initilizes the gameField variable as an empty array, each element is a cell on the grid

//     for(let i=0; i<6; i++){ // iterate over each row of the game 0 to 5 
//       gameField[i] = new Array() // nested array structure 2D
//       for(let j=0; j<7; j++){ // inner loop - iterates over each column 0-7

//         //  For each cell in the row i and column j, a value of 0 is added - no disc
//         gameField[i].push(0)
//       }
//     }
//   }


// // function that takes player 1 or 2  as a parameter for whom the disc will be placed on the board
// function placeDisc(player){
//     currentPlayer = player  // keep track who's turn it is 
//     let disc = new Disc(player) // a new disc object is created and the player parameter is passed to see if the disc is for player 1 or 2
//     disc.addToScene() // add the disc to HTML to display the disc on the screen 
//   }



// // create the disc object which has proprieties like player, color, id

// function Disc(player){
//     this.player = player // which player the disc belongs to 
//     // the color of the disc is determined based on the value of the player proprity 
//     if (player ==1) {
//         this.color = 'red'
//     } else {
//         this.color = 'yellow'
//     }
//     this.id = id.toString() // unique identifier for each disc 
//     id++
  
    
// //  add new disc element to the html and handling the logic if the current player is 2
// this.addToScene = function(){

//     // The ${this.id} and ${this.color} are placeholders that will be replaced 
//     // with the actual id and color values of the current disc object. This
//     // creates a <div> element with a unique ID and a class name based on the disc's color
//     const discHtml = '<div id="d'+this.id+'" class="disc '+this.color+'"></div>'

//     // This line adds the discHtml string to the innerHTML of 
//     // the board element. It effectively appends the newly 
//     // created disc element to the game board.
//     board.innerHTML += discHtml


//     if(currentPlayer==2){
//         //
//         let possibleMoves = think()
//         let cpuMove = Math.floor( Math.random() *  possibleMoves.length)
//         currentCol = possibleMoves[cpuMove]
//         const discElement = document.getElementById('d' + this.id)
//         discElement.style.left = `${14 + 60 * currentCol}px`
//         dropDisc(this.id,currentPlayer)
//     }
//     }


// function dropDisc(cid,player){
//     currentRow = firstFreeRow(currentCol,   player)




// //     // moveit(cid,(14+currentRow*60))
// //     // currentPlayer = player
// //     // checkForMoveVictory()
// //     }




// // function checkForMoveVictory() {



// //     if (!checkForVictory(currentRow, currentCol)) { 

// //         placeDisc(3 - currentPlayer)
// //     } else {
// //         var ww = currentPlayer == 2 ? 'Computer' : 'Player'
// //         createExplosion(currentRow, currentCol); // Call the function to create explosion
// //         alert(ww + ' win!')
// //         board.innerHTML = ''
// //         newgame()
// //     }
// //     }
    
// //     function createExplosion(row, col) {

// //     var explosion = document.createElement('div')

// //     explosion.className = 'explosion'

// //     explosion.style.left = (14 + col * 60) + 'px'

// //     explosion.style.top = (14 + row * 60) + 'px'

// //     board.appendChild(explosion)
// //     }

























  










// // /// CHECK THIS ONE TOMORROW 

// // //Check for game over(Last step)
// // const gameOverCheck = () => {
// //     let truthCounnt = 0;
// //     for (let innerArray of initialMatrix) {
// //       if (innerArray.every((val) => val != 0)) {
// //         truthCounnt += 1;
// //       } else {
// //         return false;
// //       }
// //     }
// //     if (truthCounnt == 6) {
// //       message.innerText = "Game Over";
// //       startScreen.classList.remove("hide");
// //     }
// //   };
// //   //Check rows
// //   const checkAdjacentRowValues = (row) => {
// //     return verifyArray(initialMatrix[row]);
// //   };
// //   //Check columns
// //   const checkAdjacentColumnValues = (column) => {
// //     let colWinCount = 0,
// //       colWinBool = false;
// //     initialMatrix.forEach((element, index) => {
// //       if (element[column] == currentPlayer) {
// //         colWinCount += 1;
// //         if (colWinCount == 4) {
// //           colWinBool = true;
// //         }
// //       } else {
// //         colWinCount = 0;
// //       }
// //     });
// //     //no match
// //     return colWinBool;
// //   };
// //   //Get Right diagonal values
// //   const getRightDiagonal = (row, column, rowLength, columnLength) => {
// //     let rowCount = row;
// //     let columnCount = column;
// //     let rightDiagonal = [];
// //     while (rowCount > 0) {
// //       if (columnCount >= columnLength - 1) {
// //         break;
// //       }
// //       rowCount -= 1;
// //       columnCount += 1;
// //       rightDiagonal.unshift(initialMatrix[rowCount][columnCount]);
// //     }
// //     rowCount = row;
// //     columnCount = column;
// //     while (rowCount < rowLength) {
// //       if (columnCount < 0) {
// //         break;
// //       }
// //       rightDiagonal.push(initialMatrix[rowCount][columnCount]);
// //       rowCount += 1;
// //       columnCount -= 1;
// //     }
// //     return rightDiagonal;
// //   };