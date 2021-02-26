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
init();

function init() {
  playersTurn = 'cookies';

  numOfCheckers = {
    numOfCookies: 12,
    numOfCarrots: 12
  }
    
  // initialize board array with 12 cookies and 12 carrots
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i < board[i].length - 5) {
        let cookie = new CookieCheckers('cookies', 'images/icons8-cookie-emoji-48.png',
        'images/icons8-cookie-emoji-68.png', false);
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = cookie;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = cookie;
        } 
      } else if (i > board[i].length - 4) {
        let carrot = new CarrotCheckers('carrots', 'images/icons8-carrot-48.png',
        'images/icons8-carrot-68.png', false);
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = carrot;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = carrot;
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
  clearBoard();
  // render state of board array
  for (let i = 0; i < rowArray.length; i++) {
    for (let j = 0; j < rowArray[i].length; j++) {
      if (typeof board[i][j] === 'object' && board[i][j] !== null) {
        rowArray[i][j].firstChild.setAttribute('src', `${board[i][j].imgSrc}`);
      } 
      if (typeof board[i][j] === 'object' && board[i][j] !== null && board[i][j].isQueen) {
        rowArray[i][j].firstChild.setAttribute('src', `${board[i][j].queenImgSrc}`);
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

// Wait for user to click a cell

/*----- event listeners -----*/
// CONTROLLERS
// Add event listeners to relevant elements
rowArray.forEach((row, i) => row.forEach((column, j) => column.addEventListener('click', (e) => {
  handleCheckerClick(e, i, j);
})));

let selectedPiece = null;

// event handler when player selects a checker piece
function handleCheckerClick(e, i, j) {
  if (selectedPiece) {
    if (!isValidMove(selectedPiece, i , j)) {
      selectedPiece = null;
      return;
    }
    movePiece(e, selectedPiece, i, j);
    removePiece(selectedPiece, i, j);
    isQueen(selectedPiece, i, j);
    selectedPiece = null;
    nextTurn();
    render();
  } else if (board[i][j].player === playersTurn) {
    selectedPiece = [board[i][j], i, j];
  } 
}  

function movePiece(e, selectedPiece, i, j) {
  if (typeof board[i][j] !== 'object') {
    board[i][j] = selectedPiece[0];
    board[selectedPiece[1]][selectedPiece[2]] = 1;
  }
}

// Need to add features that prevent piece from moving two spaces if noncapturing
function isValidMove(selectedPiece, i , j) {
  if (selectedPiece[0].player === 'cookies') {
    let validRow1 = selectedPiece[1]+1; // noncapturing
    let validCol1 = selectedPiece[2]+1; // noncapturing
    let validCol2 = selectedPiece[2]-1; // noncapturing
    let validRow2 = selectedPiece[1]+2; // capturing
    let validCol3 = selectedPiece[2]+2; // capturing
    let validCol4 = selectedPiece[2]-2; // capturing
    if ((i === validRow1 && j === validCol1) || (i === validRow1 && j === validCol2)) {
      return true;
    } else if ((i === validRow2 && j === validCol3 && board[i-1][j-1].player === 'carrots')
     || (i === validRow2 && j === validCol4 && board[i-1][j+1].player === 'carrots')) {
      return true;
    }
  } else if (selectedPiece[0].player === 'carrots') {
    let validRow1 = selectedPiece[1]-1; // noncapturing
    let validCol1 = selectedPiece[2]-1; // noncapturing
    let validCol2 = selectedPiece[2]+1; // noncapturing
    let validRow2 = selectedPiece[1]-2; // capturing
    let validCol3 = selectedPiece[2]-2; // capturing
    let validCol4 = selectedPiece[2]+2; // capturing
    if ((i === validRow1 && j === validCol1) || (i === validRow1 && j === validCol2)) {
      return true;
    } else if ((i === validRow2 && j === validCol3 && board[i+1][j+1].player === 'cookies')
     || (i === validRow2 && j === validCol4 && board[i+1][j-1].player === 'cookies')) {
      return true;
    }
  } 
  if ((selectedPiece[0].player === 'cookies' && selectedPiece[0].isQueen) || 
  (selectedPiece[0].player === 'carrots' && selectedPiece[0].isQueen)) {
    if (i % 2 === j % 2) {
      return true;
    }
  } else {
    return false;
  }
}

function removePiece(selectedPiece, i, j) {
  if (selectedPiece[0].player === 'cookies') {
    if (i === selectedPiece[1]+2 && j === selectedPiece[2]+2) {
      board[i-1].splice(board[i-1].indexOf(board[i-1][j-1]), 1, 1);
      numOfCheckers['numOfCarrots']--;
    } else if (i === selectedPiece[1]+2 && j === selectedPiece[2]-2) {
      board[i-1].splice(board[i-1].indexOf(board[i-1][j+1]), 1, 1);
      numOfCheckers['numOfCarrots']--;
    }
  } else if (selectedPiece[0].player === 'carrots') {
    if (i === selectedPiece[1]-2 && j === selectedPiece[2]-2) {
      board[i+1].splice(board[i+1].indexOf(board[i+1][j+1]), 1, 1);
      numOfCheckers['numOfCookies']--;
    } else if (i === selectedPiece[1]-2 && j === selectedPiece[2]+2) {
      board[i+1].splice(board[i+1].indexOf(board[i+1][j-1]), 1, 1);
      numOfCheckers['numOfCookies']--;
    }
  }
  if (selectedPiece[0].player === 'cookies' && selectedPiece[0].isQueen) {
    if (i === selectedPiece[1]-2 && j === selectedPiece[2]-2) {
      board[i+1].splice(board[i+1].indexOf(board[i+1][j+1]), 1, 1);
      numOfCheckers['numOfCarrots']--;
    } else if (i === selectedPiece[1]-2 && j === selectedPiece[2]+2) {
      board[i+1].splice(board[i+1].indexOf(board[i+1][j-1]), 1, 1);
      numOfCheckers['numOfCarrots']--;
    }
  } else if (selectedPiece[0].player === 'carrots' && selectedPiece[0].isQueen) {
    if (i === selectedPiece[1]+2 && j === selectedPiece[2]+2) {
      board[i-1].splice(board[i-1].indexOf(board[i-1][j-1]), 1, 1);
      numOfCheckers['numOfCookies']--;
    } else if (i === selectedPiece[1]+2 && j === selectedPiece[2]-2) {
      board[i-1].splice(board[i-1].indexOf(board[i-1][j+1]), 1, 1);
      numOfCheckers['numOfCookies']--;
    }
  }
}

function isQueen(selectedPiece, i, j) {
  // if cookie object lands on board array row 7, cookie isQueen
  // if carrot object lands on board array row 0, carrot isQueen
  if (selectedPiece[0].player === 'cookies') {
    let queenPositions = [];
    board[7].map(function(col) {
      if (board[7].indexOf(col) % 2 === 1) {
        queenPositions.push(board[7].indexOf(col));
      }
    });
    for (let x = 0; x < queenPositions.length; x++) {
      if (board[i][j] === board[7][queenPositions[x]]) {
        selectedPiece[0].isQueen = true;
      }  
    }
    return true;
  } else if (selectedPiece[0].player === 'carrots') {
    let queenPositions = [];
    board[0].map(function(col) {
      if (board[0].indexOf(col) % 2 === 0) {
        queenPositions.push(board[0].indexOf(col));
      }
    });
    for (let x = 0; x < queenPositions.length; x++) {
      if (board[i][j] === board[0][queenPositions[x]]) {
        selectedPiece[0].isQueen = true;
      }  
    }
    return true;
  }
}

function nextTurn() {
  if (playersTurn === 'cookies') {
    playersTurn = 'carrots';
  } else if (playersTurn === 'carrots') {
    playersTurn = 'cookies';
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

// Handle click on replay button
replayBtnEl.addEventListener('click', init);