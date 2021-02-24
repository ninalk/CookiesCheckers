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
let checkerPieces;
let winner;
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

const replayBtnEl = document.getElementById('replay-btn');

/*----- functions -----*/
// CALLBACK FUNCTIONS 
// Init function - what the users see upon loading the browser
  // Initialize Player's turn

init();

function init() {
  console.log('init is working');

  playersTurn = 'cookiesTurn';

  numOfCheckers = {
    numOfCookies: 12,
    numOfCarrots: 12
  }
  
  checkerPieces = 'cookiePieces';
  
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
  
  winner = null;
  // moveOptions();
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
  // moveOptions(e, selectedPiece, i, j);    
  // render scoreboard
  for (let num in numOfCheckers) {
    scoreEls[num].innerText = numOfCheckers[num];

    // render winner
    if (numOfCheckers[num] === 0) {
      window.alert('COOKIE WINS!!!');
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
    movePiece(e, selectedPiece, i, j);
    moveOptions(e, selectedPiece, i, j);
  }
  selectedPiece = [board[i][j], i, j];
  
  // isQueen?
}  

function movePiece(e, selectedPiece, i, j) {
  if (typeof board[i][j] !== 'object') {
    board[i][j] = selectedPiece[0];
    board[selectedPiece[1]][selectedPiece[2]] = 1;
  }
  
  selectedPiece = 1;
  render();
}

let capturing;

function moveOptions(e, selectedPiece, i, j) {
  if (playersTurn === 'cookiesTurn') {
    turnEls.cookiesTurn.style.border = '5px solid grey';
    deactivateCarrots();
    
    if (!capturing) {
      let option1 = `${selectedPiece[1]+1}, ${selectedPiece[2]+1}`;
      let option2 = `${selectedPiece[1]+1}, ${selectedPiece[2]-1}`;
      console.log('Option 1 is board index ' + option1)
      console.log('Option 2 is board index ' + option2)
      // style options?
    } else if (capturing) {
      let option1 = `${selectedPiece[1]+2}, ${selectedPiece[2]+2}`;
      let option2 = `${selectedPiece[1]+2}, ${selectedPiece[2]-2}`;
      console.log('Option 1 is board index ' + option1)
      console.log('Option 2 is board index ' + option2)
      // style options?
      // update the scores
      numOfCheckers[numofCookies]--;
    } else if (isQueen) {
      console.log('Queen cookie can move anywhere!')
    }
  } else if (playersTurn === 'carrotsTurn') {
    turnEls.carrotsTurn.style.border = '5px solid grey';
    deactivateCookies();

    let option1 = `${selectedPiece[1]-1}, ${selectedPiece[2]-1}`;
    let option2 = `${selectedPiece[1]-1}, ${selectedPiece[2]+1}`;
    console.log('Option 1 is board index ' + option1)
    console.log('Option 2 is board index ' + option2)
    // style options?
  } else if (capturing) {
    let option1 = `${selectedPiece[1]-2}, ${selectedPiece[2]-2}`;
    let option2 = `${selectedPiece[1]-2}, ${selectedPiece[2]+2}`;
    console.log('Option 1 is board index ' + option1)
    console.log('Option 2 is board index ' + option2)
    // style options?
    // update scores
    numOfCheckers[numOfCookies]--;

  } else if (isQueen) {
    console.log('Queen carrot can move anywhere!')
  }

}

function deactivateCarrots() {

};
function deactivateCookies() {

};

// Handle click on Reset button
replayBtnEl.addEventListener('click', init);