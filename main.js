// this script will contain the 42 rows
// and columns instead of hard coding them in html and copy pasting the divs 42 times

// select the div element
const board = document.querySelector("#board")

// how many pieces exist already in that column 

const RED_TURN = 1 
const YELLOW_TURN = 2 


// 0 - empty , 1 - red, 2 - yellow 
// represent what pieces exist already on the board 
// we'll use an array of numbers and each number will represent wheater or not a 
// piece is in each cell in the board 
// we'll have an array with 42 numbers in it 
const pieces = [ 
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 
    0, 0, 0, 0, 0, 0, 0,
]


let playerTurn = 1 // 1-red, 2 - yellow 

// will store whatever column we hovered over
let hoverColumn = -1


// create and add 42 divs into the board element 
for (let i = 0; i < 42; i++ ){
    // create the div
    let cell = document.createElement("div")
    
    // give the div a class name
    cell.className= "cell"

    // append the div to the board
    board.appendChild(cell)

    // because we need to drop a disc when the mouse enter a certain space
    // for that we need to add listeners to every div on the board 
    //calculate which column the user hovers over based on the index of the div 

    cell.onmouseenter = () => {
        // all the indexes in the first column are multiples of % 7 
        // so to get the column nos we can use % 
        onMouseEnteredColumn(i % 7)
    }

    // we need to be able to tell when the user clicked on a column
    cell.onclick = () => {
        onColumnClicked(i % 7)

    }
}


// we want to be able to filter the above array with indexes that only much the column number
// we want a new array with just the contents of the specific column
// take the column number coming from 1 % 7 
function onColumnClicked (column) {
    // will give us the first availabe row 
    let availableRow = pieces.filter( (_, index) => index % 7 === column).lastIndexOf(0)
    if(availableRow  == -1){
        // no space in the column
        return
    } 

    pieces[(availableRow * 7) + column] = playerTurn
    let cell = board.children[(availableRow * 7) + column]
    let piece = document.createElement("div")
    // give a class name of piece
    piece.className = "piece"
    // give it a dataset
    piece.dataset.placed = true
    // append the piece to the cell

    // set whether or not should be a yellow piece
    piece.dataset.player = playerTurn

    cell.appendChild(piece)


    let unplacedPiece = document.querySelector("[data-placed = 'false']")
    let unplacedY = unplacedPiece.getBoundingClientRect().y // this will give us bounding rectangle for where unplaced pieces on the screen
    let placedY = piece.getBoundingClientRect().y
    let yDiff = unplacedY - placedY // it will give us the number of pixels we want to animate from the top down tot he bottom


    // animating = true



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
        // when the animation finishes it will run this function 
      animation.addEventListener('finish', () => { })
}


function checkGameWinOrDraw() {

    if(playerTurn === RED_TURN) {
        playerTurn = YELLOW_TURN
    } else {
        playerTurn = RED_TURN
    }

    // update hovering piece 
    updateHover()

}



function updateHover () { 
    let unplacedPiece = document.querySelector("[data-placed = 'false']") // this returns null, we need to guard against that
    if (unplacedPiece) { 
        unplacedPiece.parentElement.removeChild(unplacedPiece)
    }
    

    // if pieces of the hover column is 0, we are safe to place a piece
    // basically check first if there is space for another disc to be added
    if (pieces[hoverColumn] === 0) {
    // add a piece
    let cell = board.children[hoverColumn]
    // within this cell, which is itself a div, will place another div
    let piece = document.createElement("div")
    // give a class name of piece
    piece.className = "piece"
    // give it a dataset
    piece.dataset.placed = false
    piece.dataset.player = playerTurn
    // append the piece to the cell
    cell.appendChild(piece)
    }
}


// within this function will get the appropiate cell for the top of the grid
// no matter if it's the top or the bottom 
function onMouseEnteredColumn (column) {
    hoverColumn = column
    updateHover()
}


    