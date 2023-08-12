// Get the audio element
const backgroundAudio = document.getElementById('background-audio')

// Play the background audio when the page loads
window.addEventListener('load', () => {
    backgroundAudio.play()
})

// reload/play again when clicked 
resetButton.onclick = () => {
    location.reload()
  }


// select the box container 
const Container = document.querySelector("#modal-container")

// select the reset button 
const resetButton = document.querySelector("#reset")

// grab the modal message 
const modalMessage = document.querySelector("#modal-message")

// select the board element
const board = document.querySelector("#board")

let currentPlayer = redPlayer // 1 - red, 2 - yellow

// will store whatever column we hovered over
let hoverColumn = -1
let animating = false

// first player is the redplayer
const redPlayer = 1
const yellowPlayer = 2


// we'll use an array each number will represent wheater or not a piece is in each cell in the board + which color is it 
// thus => we'll end up with an array with 42 numbers in it 

const gamePieces = [
  0, 0, 0, 0, 0, 0, 0,        
  0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,           // 0 - empty, 1 - red, 2 - yellow
  0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0,
]

// and columns instead of hard coding them in html and copy pasting the divs 42 times

for (let i = 0; i < 42; i++) {
  // create 42 divs
    let cell = document.createElement("div")

    // give the div a class name of cell 
    cell.className = "cell"

    // append the cell div to the the parent board div 
    board.appendChild(cell)
  
    // for that we add event listeners to every div on the board 
    //calculate which column the user hovers over based on the index of the div 
    cell.onmouseenter = () => {
      // all the indexes in the first column are multiples of 7 so we can use % 7 to get the column number
      columnEnteredWithMouse(i % 7)
    }

    // trigger this when the user clicks on that colun
    // similar to the mouser hover, we can tell where the user clicked based on the index (%7)
    cell.onclick = () => {
      if(!animating) {
        clickedColumn(i % 7)
      }
    }
  }



// filter the above array with indexes that only match the column number 
// return a new array with just the contents of the specific column and not all the div on the board 
function clickedColumn(column) {
  
  let availableRow = gamePieces.filter( (_, index) => index % 7 === column).lastIndexOf(0) // filtering the array, this method searches for the last occurrence of the value 0/empty space
  // if 0 not found, and it's -1 than exit function 
  if(availableRow === -1) {
    // no space in the column
    return
  }

  // calculate the index in the array where the game piece will be placed 
  gamePieces[(availableRow * 7) + column] = currentPlayer

  // find the index to acess the correct cell element based on the available row and specified column
  let cell = board.children[(availableRow * 7) + column]
  

  // create a new div element representing the piece/disc 
  let piece = document.createElement("div")

  // give it a class name of piece
  piece.className = "piece"

  // give it a data attribute on the div, indicate that the piece has been place in this cell => value is set to true
  piece.dataset.placed = true

  // set whether or not should be a yellow or red piece 
  piece.dataset.player = currentPlayer

  // append the div element tot the cell 
  cell.appendChild(piece)



  let unplacedPiece = document.querySelector("[data-placed='false']")
  let unplacedY = unplacedPiece.getBoundingClientRect().y  // this will give us bounding rectangle for where unplaced pieces on the screen
  let placedY = piece.getBoundingClientRect().y // // it will give us the number of pixels we want to animate from the top down tot he bottom
  let yDiff = unplacedY - placedY;

  animating = true
  removeUnplacedPiece()
  let animation = piece.animate(
    [
      { transform: `translateY(${yDiff}px)`, offset: 0},
      { transform: `translateY(0px)`, offset: 0.6},
      { transform: `translateY(${yDiff / 20}px)`, offset: 0.8},
      { transform: `translateY(0px)`, offset: 0.95}
    ],
    {
      duration: 400,
      easing: "linear",
      iterations: 1
    }
  )
  animation.addEventListener('finish', checkGameWinOrDraw)
}

function checkGameWinOrDraw() {
  animating = false

  // check if game is a draw
  if(!gamePieces.includes(0)) {
    // game is a draw
    modalContainer.style.display = "block"
    modalMessage.textContent = "Draw"
  }

  // check if the current player has won
  if(hasPlayerWon(currentPlayer, gamePieces)) {
    // current player has won
    modalContainer.style.display = "block"
    modalMessage.textContent = `${currentPlayer === redPlayer ? "Red" : "Yellow"} WON!`
    modalMessage.dataset.winner = currentPlayer
  }


  if(currentPlayer === redPlayer) {
    currentPlayer = yellowPlayer
  } else {
    currentPlayer = redPlayer
  }

  // update hovering piece
  updateHover()
}

function updateHover() {
  removeUnplacedPiece() // at the top of the board while adding the piece in the cell 

  // add piece only after checking that there is still place in the column
  if(gamePieces[hoverColumn] === 0) {
    let cell = board.children[hoverColumn]
    let piece = document.createElement("div")
    piece.className = "piece"
    piece.dataset.placed = false
    piece.dataset.player = currentPlayer
    cell.appendChild(piece)
  }
}

function removeUnplacedPiece() {

  // this function removes the existing piece if there is one already there
  let unplacedPiece = document.querySelector("[data-placed='false']")
  if(unplacedPiece) { // if this is not null, but returns an element from our DOM, we'll need  to remove it 
    unplacedPiece.parentElement.removeChild(unplacedPiece)
  }
}



// but we want to know if for exexmple, we hover over index 38 => what column is that? we can have it by % 7 
function columnEnteredWithMouse(column) {
  hoverColumn = column;
  if(!animating){
    updateHover()
  }
}

function hasPlayerWon(currentPlayer, gamePieces) {
  for (let index = 0; index < 42; index++) {
    // check horiztonal win starting at index
    if(
      index % 7 < 4 &&
      gamePieces[index] === currentPlayer &&
      gamePieces[index + 1] === currentPlayer &&
      gamePieces[index + 2] === currentPlayer &&
      gamePieces[index + 3] === currentPlayer
    ) {
      return true;
    }

    // check vertical win starting at index
    if(
      index < 21 &&
      gamePieces[index] === currentPlayer &&
      gamePieces[index + 7] === currentPlayer &&
      gamePieces[index + 14] === currentPlayer &&
      gamePieces[index + 21] === currentPlayer
    ) {
      return true;
    }

    // check diagonal win starting at index
    if(
      index % 7 < 4 &&
      index < 18 &&
      gamePieces[index] === currentPlayer &&
      gamePieces[index + 8] === currentPlayer &&
      gamePieces[index + 16] === currentPlayer &&
      gamePieces[index + 24] === currentPlayer
    ) {
      return true;
    }

    // check diagonal win (other direction) starting at index
    if(
      index % 7 >= 3 &&
      index < 21 &&
      gamePieces[index] === currentPlayer &&
      gamePieces[index + 6] === currentPlayer &&
      gamePieces[index + 12] === currentPlayer &&
      gamePieces[index + 18] === currentPlayer
    ) {
      return true
    }
  }

  return false
}



