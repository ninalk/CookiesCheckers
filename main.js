/*----- constants -----*/
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
// Set State Variables - these variables can change during the game
let board = [[1, null, 1, null, 1, null, 1, null],
             [null, 1, null, 1, null, 1, null, 1],
             [1, null, 1, null, 1, null, 1, null],
             [null, 1, null, 1, null, 1, null, 1],
             [1, null, 1, null, 1, null, 1, null],
             [null, 1, null, 1, null, 1, null, 1],
             [1, null, 1, null, 1, null, 1, null],
             [null, 1, null, 1, null, 1, null, 1]];

let numOfCheckers;
let playersTurn;

/*----- cached element references -----*/
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

const winnerEl = document.getElementById('winner');
const replayBtnEl = document.getElementById('replay-btn');

/*----- functions -----*/
// CALLBACK FUNCTIONS 
// Init function - what the users see upon loading the browser
  // Initialize Player's turn

init();

function init() {
  console.log('init is working');

  playersTurn = 'cookies';

  numOfCheckers = {
    numOfCookies: 12,
    numOfCarrots: 12
  }
    
  // initialize board array with 12 cookies and 12 carrots
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i < board[i].length - 5) {
        let cookies = new CookieCheckers('cookies', 'images/icons8-cookie-emoji-48.png',
        'images/icons8-cookie-emoji-96.png', false);
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = cookies;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = cookies;
        } 
      } else if (i > board[i].length - 4) {
        let carrots = new CarrotCheckers('carrots', 'images/icons8-carrot-48.png',
        'images/icons8-carrot-96.png', false);
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = carrots;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = carrots;
        }
      } else {
        board[i][j] = 1;
      }
    }
  }
  winnerEl.style.visibility = 'hidden';
  render();
}

// Render function - responsible for transferring all state variables
function render() {
  console.log('render is working');
  clearBoard();
  // render state of board array
  for (let i = 0; i < rowArray.length; i++) {
    for (let j = 0; j < rowArray[i].length; j++) {
      if (typeof board[i][j] === 'object' && board[i][j] !== null) {
        rowArray[i][j].firstChild.setAttribute('src', `${board[i][j].imgSrc}`);
      } else {
      }
    }
  }
  // render players turn and move options
  if (playersTurn === 'carrots') {
    turnEls.carrotsTurn.style.border = '5px solid grey';
    turnEls.cookiesTurn.style.border = 'none';
  } else {
    turnEls.cookiesTurn.style.border = '5px solid grey';
    turnEls.carrotsTurn.style.border = 'none';
  }
  // moveOptions(e, selectedPiece, i, j); 


  // render scoreboard
  for (let num in numOfCheckers) {
    scoreEls[num].innerText = numOfCheckers[num];

    // render winner
    if (num === 'numOfCarrots' && numOfCheckers[num] === 0) {
      winnerEl.innerText = 'COOKIE WINS!!!';
      winnerEl.style.visibility = "visible";
    } else if (num === 'numOfCookies' && numOfCheckers[num] === 0) {
      winnerEl.innerText = 'CARROTS WIN!!!';
      winnerEl.style.visibility = "visible";
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
    if (!isValidMove(selectedPiece, i , j)) {
      return;
    }
    movePiece(e, selectedPiece, i, j);
    removePiece(selectedPiece, i, j);
    selectedPiece = null;
    nextTurn();
    render();
  } else if (board[i][j].player === playersTurn) {
    selectedPiece = [board[i][j], i, j];
    // moveOptions(e, selectedPiece, i, j);
  } 
}  

function movePiece(e, selectedPiece, i, j) {
  // console.log(selectedPiece, ' this is selectedPiece before move')
  if (typeof board[i][j] !== 'object') {
    board[i][j] = selectedPiece[0];
    board[selectedPiece[1]][selectedPiece[2]] = 1;
  }
}

function isValidMove(selectedPiece, i , j) {
  if (selectedPiece[0].player === 'cookies') {
    let validRow1 = selectedPiece[1]+1; // noncapturing
    let validCol1 = selectedPiece[2]+1; // noncapturing
    let validCol2 = selectedPiece[2]-1; // noncapturing
    let validRow2 = selectedPiece[1]+2; // capturing
    let validCol3 = selectedPiece[2]+2; // capturing
    let validCol4 = selectedPiece[2]-2; // capturing
    if ((i === validRow1 && j === validCol1) || (i === validRow1 && j === validCol2) ||
    (i === validRow2 && j === validCol3) || (i === validRow2 && j === validCol4)) {
      return true;
    } else {
      return false;
    }
  } else if (selectedPiece[0].player === 'carrots') {
    let validRow1 = selectedPiece[1]-1; // noncapturing
    let validCol1 = selectedPiece[2]-1; // noncapturing
    let validCol2 = selectedPiece[2]+1; // noncapturing
    let validRow2 = selectedPiece[1]-2; // capturing
    let validCol3 = selectedPiece[2]-2; // capturing
    let validCol4 = selectedPiece[2]+2; // capturing
    if ((i === validRow1 && j === validCol1) || (i === validRow1 && j === validCol2) ||
      (i === validRow2 && j === validCol3) || (i === validRow2 && j === validCol4)) {
        return true;
    } else {
      return false;
    }
  }
}

function removePiece(selectedPiece, i, j) {
  console.log(selectedPiece, i, j)
  if (selectedPiece[0].player === 'cookies') {
    let jumpCarrot1 = board[selectedPiece[1]+2][selectedPiece[2]+2];
    let jumpCarrot2 = board[selectedPiece[1]+2][selectedPiece[2]-2];
    if (board[i][j] === jumpCarrot1) {
      board[i-1][j-1].imgSrc = "";
      console.log(board[i-1][j-1].imgSrc)
    } else if (board[i][j] === jumpCarrot2) {
      board[i-1][j+1].imgSrc = "";
    }
  } else if (selectedPiece[0].player === 'carrots') {
    let jumpCookie1 = board[selectedPiece[1]-2][selectedPiece[2]-2];
    let jumpCookie2 = board[selectedPiece[1]-2][selectedPiece[2]+2];
    if (board[i][j] === jumpCookie1) {
      board[i+1][j+1].imgSrc = "";
    } else if (board[i][j] === jumpCookie2) {
      board[i+1][j-1].imgSrc = "";
    }
  }
}

function nextTurn() {
  if (playersTurn === 'cookies') {
    playersTurn = 'carrots';
  } else if (playersTurn === 'carrots') {
    playersTurn = 'cookies';
  }
}

function updateScore() {

}

// Handle click on Reset button
replayBtnEl.addEventListener('click', init);