/*----- constants -----*/
// Constants
// Images of cookies and carrots including queen pieces (larger images)
class Checkers {
  constructor(player, imgSrc, queenImgSrc, isQueen) {
    this.player = player;
    this.imgSrc = imgSrc;
    this.queenImgSrc = queenImgSrc;
    this.isQueen = isQueen;
  }
}

// Subclasses of Checkers class
class CookieCheckers extends Checkers {
  constructor(player, imgSrc, queenImgSrc, isQueen) {
    super(player, imgSrc, queenImgSrc, isQueen);
  }
}

class CarrotCheckers extends Checkers {
  constructor(player, imgSrc, queenImgSrc, isQueen) {
    super(player, imgSrc, queenImgSrc, isQueen);
  }
}

/*----- app's state (variables) -----*/
// MODEL
// Set State Variables - these variables can change during the game
// Represent the board with nested arrays
  // populate an element with a piece object and null 
  // can represent an empty space
let board = [[null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null, null]];

let numOfCheckers;
let winner;

// When a piece becomes a Queen? Change image to larger image
  // Player 1 - Cookie Queen pieces
  // Player 2 - Carrot Queen pieces
// Player's turn - tells users who's turn it is
  // Randomly generate who goes first and style div that holds turn
let playersTurn;

/*----- cached element references -----*/
// VIEW
// Store elements that need to be accessed multiple times throughout the game
const row0El = document.querySelectorAll('.row-0');
const row1El = document.querySelectorAll('.row-1');
const row2El = document.querySelectorAll('.row-2');
const row3El = document.querySelectorAll('.row-3');
const row4El = document.querySelectorAll('.row-4');
const row5El = document.querySelectorAll('.row-5');
const row6El = document.querySelectorAll('.row-6');
const row7El = document.querySelectorAll('.row-7');
const rowArray = [row0El, row1El, row2El, row3El, row4El, row5El, row6El, row7El];

const turnEls = {
  cookiesTurn: document.getElementById('cookies-turn'),
  carrotsTurn: document.getElementById('carrots-turn')
}

const scoreEls = {
  numOfCookies: document.getElementById('num-of-cookies'),
  numOfCarrots: document.getElementById('num-of-carrots')
}

const replayBtnEL = document.getElementById('replay-btn');
/*----- functions -----*/
// CALLBACK FUNCTIONS 
// Init function - what the users see upon loading the browser
  // Initialize Player's turn
  // Each player should have all 12 pieces on the board in designated cells
  // No player should have a Queen piece
  // State of the game - the scoreboard should show 12:12
init();

function init() {
  console.log('init is working');

  playersTurn = 'cookiesTurn';

  numofCheckers = {
    numOfCookies: 12,
    numOfCarrots: 12
  }
 
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i < board[i].length - 5) {
        let cookieChecker = new CookieCheckers('cookies', 'images/icons8-cookie-emoji-48.png',
        'images/icons8-cookie-emoji-96.png', false);
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = cookieChecker;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = cookieChecker;
        }
      } else if (i > board[i].length - 4) {
        let carrotChecker = new CarrotCheckers('carrots', 'images/icons8-carrot-48.png',
        'images/icons8-carrot-96.png', false);
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = carrotChecker;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = carrotChecker;
        }
      }
    }
  }
  winner = null;
  // clearBoard();
  render();
}

// Render function - responsible for transferring all state variables
  // Render the board
    // Populate each player's pieces in designated cell on the board
    // If empty cell is clicked, player's piece should occupy empty cell
    // If enemy is captured, remove enemy from cell
  // Render scoreboard
    // When enemy is captured, update scoreboard
    // When 0 pieces left, display winner and loser

function render() {
  console.log('render is working');
  
  // render first row (row0El)
  for (let i = 0; i < row0El.length; i++) {
    if (board[0][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[0][i].imgSrc}`);
      row0El[i].appendChild(checker);
    } else {
    }
  }
  // render second row (row1El)
  for (let i = 0; i < row1El.length; i++) {
    if (board[1][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[1][i].imgSrc}`)
      row1El[i].appendChild(checker);
    } else {
    }
  }
  // render third row (row2El)
  for (let i = 0; i < row2El.length; i++) {
    if (board[2][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[2][i].imgSrc}`)
      row2El[i].appendChild(checker);
    } else {
    }
  }
  // render fourth row (row3El)
  for (let i = 0; i < row3El.length; i++) {
    if (board[3][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[3][i].imgSrc}`)
      row3El[i].appendChild(checker);
    } else {
    }
  }
  // render fifth row (row4El)
  for (let i = 0; i < row4El.length; i++) {
    if (board[4][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[4][i].imgSrc}`)
      row4El[i].appendChild(checker);
    } else {
    }
  }
  // render sixth row (row5El)
  for (let i = 0; i < row5El.length; i++) {
    if (board[5][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[5][i].imgSrc}`)
      row5El[i].appendChild(checker);
    } else {
    }
  }
  // render seventh row (row6El)
  for (let i = 0; i < row6El.length; i++) {
    if (board[6][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[6][i].imgSrc}`)
      row6El[i].appendChild(checker);
    } else {
    }
  }
  // render eigth row (row7El)
  for (let i = 0; i < row7El.length; i++) {
    if (board[7][i] !== null) {
      let checker = document.createElement('IMG')
      checker.setAttribute('src', `${board[7][i].imgSrc}`)
      row7El[i].appendChild(checker);
    } else {
    }
  }

}


function clearBoard() {
  rowArray.forEach(function(row) {
    for (let i = 0; i < row.length; i++) {
      if (row[i].hasChildNodes()) {
        row[i].removeChild(row[i].firstChild);
      } else {
      }
    }
  }); 
}

// Wait for user to click a cell


/*----- event listeners -----*/
// CONTROLLERS
// Add event listeners to relevant elements
function getCookieCheckers() {

}

let capturing;

function nextTurn() {
  if (playersTurn === 'cookiesTurn') {
    turnEls.carrotsTurn.style.backgroundColor = 'grey';
    turnEls.cookiesTurn.style.backgroundColor = 'none';
    
    // add event listeners to the cookies allowed to move and empty cells
    // for (let i = 0; i < rowArray.length; i++) {
    //   for (let j = 0; j < rowArray[i].length; j++) {
    //     if (rowArray[i][j].innerHTML === `${board[i][j].imgSrc}`) {
    //       rowArray[i][j].addEventListener('click', (e) => {console.log(e.target)});
    //     } else if (rowArray[i][j].innerHTML === null) {
    //       console.log(rowArray[i][j].innerHTML, 'should be null')
    //     }

    //   }
    // }
    // if nonCapturing, allow cookie to move one space on board array [+1][+1] || [+1][-1]
    // if capturing carrot, allow cookie to move on the board array [+2][+2] || [+2][-2]
    // update numOfCheckers
      // ifQueen, change imgSrc to Queen, allow cookie to move any direction

    // after two clicks, playersTurn = 'carrotsTurn'
           
  } else if (playersTurn === 'carrotsTurn') {
    turnEls.carrotsTurn.style.backgroundColor = 'none';
    turnEls.cookiesTurn.style.backgroundColor = 'grey';
    
    // row5El.forEach(element => element.addEventListener('click', e => console.log(e.target)));
    // row6El.forEach(element => element.addEventListener('click', e => console.log(e.target)));
    // row7El.forEach(element => element.addEventListener('click', e => console.log(e.target)));
  }

  render();
}

// function cookieMoves(currPosition, newPosition) {
//   if (nonCapturing) {
//     newPosition = board[currPosition + 1][currPosition + 1] || board[currPosition + 1][currPosition - 1];
//   } else if (capturing) {
//     newPosition = board[currPosition + 2][currPosition + 2] || board[currPosition + 2][currPosition - 2];
//   }
// }

// function announceWinner() {
//   if (numOfCookies === 0) {
//     winner = alert('CARROTS WINS!!');
//   } else {
//     winner = alert('COOKIE WINS!!!');
//   }
// }

// Handle click on Reset button
  // Initialize state variables 
  // Render browser
// replayBtnEL.addEventListener('click', init);