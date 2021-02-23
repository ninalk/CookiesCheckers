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
let board = [[0, null, 1, null, 2, null, 3, null],
             [null, 4, null, 5, null, 6, null, 7],
             [8, null, 9, null, 10, null, 11, null],
             [null, 12, null, 13, null, 14, null, 15],
             [16, null, 17, null, 18, null, 19, null],
             [null, 20, null, 21, null, 22, null, 23],
             [24, null, 25, null, 26, null, 27, null],
             [null, 28, null, 29, null, 30, null, 31]];

let numOfCheckers;
let checkerPiece;
let mode;
let winner;
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
  
  mode = {
    capturing: false,
    nonCapturing: true
  }

  checkerPiece = 'cookieChecker';
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
  clearBoard();
  
  // render first row (row0El)
  for (let i = 0; i < row0El.length; i++) {
    if (typeof board[0][i] === 'object' && board[0][i] !== null) {
      row0El[i].firstChild.setAttribute('src', `${board[0][i].imgSrc}`);
    } else {
    }
  }
  // render second row (row1El)
  for (let i = 0; i < row1El.length; i++) {
    if (typeof board[1][i] === 'object' && board[1][i] !== null) {
      row1El[i].firstChild.setAttribute('src', `${board[1][i].imgSrc}`);
    } else {
    }
  }
  // render third row (row2El)
  for (let i = 0; i < row2El.length; i++) {
    if (typeof board[2][i] === 'object' && board[2][i] !== null) {
      row2El[i].firstChild.setAttribute('src', `${board[2][i].imgSrc}`);
    } else {
    }
  }
  // render fourth row (row3El)
  for (let i = 0; i < row3El.length; i++) {
    if (typeof board[3][i] === 'object' && board[3][i] !== null) {
      row3El[i].firstChild.setAttribute('src', `${board[3][i].imgSrc}`);
    } else {
    }
  }
  // render fifth row (row4El)
  for (let i = 0; i < row4El.length; i++) {
    if (typeof board[4][i] === 'object' && board[4][i] !== null) {
      row4El[i].firstChild.setAttribute('src', `${board[4][i].imgSrc}`);
    } else {
    }
  }
  // render sixth row (row5El)
  for (let i = 0; i < row5El.length; i++) {
    if (typeof board[5][i] === 'object' && board[5][i] !== null) {
      row5El[i].firstChild.setAttribute('src', `${board[5][i].imgSrc}`);
    } else {
    }
  }
  // render seventh row (row6El)
  for (let i = 0; i < row6El.length; i++) {
    if (typeof board[6][i] === 'object' && board[6][i] !== null) {
      row6El[i].firstChild.setAttribute('src', `${board[6][i].imgSrc}`);
    } else {
    }
  }
  // render eigth row (row7El)
  for (let i = 0; i < row7El.length; i++) {
    if (typeof board[7][i] === 'object' && board[7][i] !== null) {
      row7El[i].firstChild.setAttribute('src', `${board[7][i].imgSrc}`);
    } else {
    }
  }

}

function clearBoard() {
  rowArray.forEach(function(row) {
    for (let i = 0; i < row.length; i++) {
      if (row[i].hasChildNodes()) {
        row[i].firstChild.removeAttribute('src');
      } else {
      }
    }
  }); 
}

// Wait for user to click a cell


/*----- event listeners -----*/
// CONTROLLERS
// Add event listeners to relevant elements
rowArray.forEach((row, i) => row.forEach((column, j) => column.addEventListener('click', (e) => {
  handleCheckerClick(e, i, j);
})));

let selectedPiece = null;

function handleCheckerClick(e, i, j) {
  if (selectedPiece) {
    console.log("this is the selectedPiece", selectedPiece)
    movePiece(e, selectedPiece, i, j);
  }
  selectedPiece = [board[i][j], i, j];
  // find index of object clicked in the board array and get object
  console.log ('row' + i, 'column' + j)
  let cookie = board[i][j];
  // need to get index to show available options on the board
  let option1 = board[i+1][j+1];
  let option2 = board[i+1][j-1];
  console.log('Option 1 ID is ' + option1)
  console.log('Option 1 ID is ' + option2)
  
  // if option1 is clicked, assign cookie to option1
  option1 = cookie;
  console.log(option1)
  // else if option2 is clicked, assign cookie to option2
  // isQueen?
  // render();
}  

function movePiece(e, selectedPiece, i, j) {
  console.log(board[i][j])
  console.log(selectedPiece)
  console.log(e)
  if (typeof board[i][j] !== 'object') {
    console.log(board[i][j])
    console.log(selectedPiece)
    board[i][j] = selectedPiece[0];
    board[selectedPiece[1]][selectedPiece[2]] = null;
  }
  selectedPiece = null;
  render();
}

function nextTurn() {
  if (playersTurn === 'cookiesTurn') {
    turnEls.carrotsTurn.style.backgroundColor = 'grey';
    turnEls.cookiesTurn.style.backgroundColor = 'none';
    
    // get cookies

    // add event listeners to the cookies allowed to move and empty cells

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