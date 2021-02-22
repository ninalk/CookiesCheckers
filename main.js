/*----- constants -----*/
// Constants
// Images of cookies and carrots including king pieces (larger images)
class Checkers {
  constructor(player, imgSrc, kingImgSrc, isKing, position) {
    this.player = player;
    this.imgSrc = imgSrc;
    this.kingImgSrc = kingImgSrc;
    this.isKing = isKing;
    this.position = position;
  }
}

// Subclasses of Checkers class
class CookieCheckers extends Checkers {
  constructor(player, imgSrc, kingImgSrc, isKing, position) {
    super(player, imgSrc, kingImgSrc, isKing, position);
  }
}

class CarrotCheckers extends Checkers {
  constructor(player, imgSrc, kingImgSrc, isKing, position) {
    super(player, imgSrc, kingImgSrc, isKing, position);
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


  // Use classes to create CookiePieces and CarrotPieces
let cookieCheckers = new CookieCheckers('cookies', 'images/icons8-cookie-emoji-48.png',
  'images/icons8-cookie-emoji-96.png', false);
  
let carrotCheckers = new CarrotCheckers('carrots', 'images/icons8-carrot-48.png',
  'images/icons8-carrot-96.png', false);

let numOfCheckers;
let winner;
let imgClicked;
let newPosition;

// When a piece becomes a King? Change image to larger image
  // Player 1 - Cookie King pieces
  // Player 2 - Carrot King pieces
// Player's turn - tells users who's turn it is
  // Randomly generate who goes first and style div that holds turn
let playersTurn;

/*----- cached element references -----*/
// VIEW
// Store elements that need to be accessed multiple times throughout the game
const boardEl = document.querySelectorAll('.black');

const turnEls = {
  cookiesTurn: document.getElementById('cookies-turn'),
  carrotsTurn: document.getElementById('carrots-turn')
}

const replayBtnEL = document.getElementById('replay-btn');

const scoreEls = {
  numOfCookies: document.getElementById('num-of-cookies'),
  numOfCarrots: document.getElementById('num-of-carrots')
}

/*----- functions -----*/
// CALLBACK FUNCTIONS 
// Init function - what the users see upon loading the browser
  // Initialize Player's turn
  // Each player should have all 12 pieces on the board in designated cells
  // No player should have a King piece
  // State of the game - the scoreboard should show 12:12
init();

function init() {
  console.log('init is working');

  playersTurn = {
    cookiesTurn: 'grey',
    carrotsTurn: 'none'
  }

  numofCheckers = {
    numOfCookies: 12,
    numOfCarrots: 12
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (i < board[i].length - 5) {
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = cookieCheckers;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = cookieCheckers;
        }
      } else if (i > board[i].length - 4) {
        if (i % 2 === 0 && j % 2 === 0) {
          board[i][j] = carrotCheckers;
        } else if (i % 2 === 1 && j % 2 === 1) {
          board[i][j] = carrotCheckers;
        }
      }
    }
  }
  console.log(board)
  
  stageCheckers();

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



}

function stageCheckers() {
  for (let i = 0; i < boardEl.length; i++) {
    if (i < 12) {
      let makeCookies = document.createElement('IMG');
      makeCookies.setAttribute('src', cookieCheckers.imgSrc);
      boardEl[i].appendChild(makeCookies);
    } else if (i >= 20) {
      let makeCarrots = document.createElement('IMG');
      makeCarrots.setAttribute('src', carrotCheckers.imgSrc);
      boardEl[i].appendChild(makeCarrots);
    }
  }
}

// function getPlayersTurn(lastPlayer) {
//   if (lastPlayer === 'cookiesTurn') {
//     turnEls.carrotsTurn.style.backgroundColor = 'grey';
//   } else {
//     turnEls.cookiesTurn.style.backgrounColor = 'grey';
//   }

//   render();
// }

// Wait for user to click a cell


/*----- event listeners -----*/
// CONTROLLERS
// Add event listeners to relevant elements
// Handle a player clicking an empty black cells
// Options for one move only (no enemy is diagonally adjacent)
  // Player piece can move only to one empty cell
// Options for when enemy is diagonally adjacent and empty cell is available
  // Player piece can move two cells or more (if piece lands adjacent to another 
  // enemy with an empty cell)
// If enemy is captured, update number of pieces left in scoreboard
  // When zero pieces left, game over! Name the winner!
// Options for when player piece is a king and can move only one cell when non-capturing 
// versus any number of cells when capturing
boardEl.forEach(cell => cell.addEventListener('click', function(e) {
  console.log(e.target)
  // let getChecker = e.target;
  // let getCell = e.currentTarget;
  // let newCell = e.target;
  // // moveCheckers(getChecker, appendChecker)
  // if (getCell.hasChildNodes()) {
  //   cell.removeChild(getChecker);
  // } else {
  //   newCell.appendChild();
  // }
  
}));
console.log(boardEl)


function moveCheckers(imgClicked, newPosition) {
  console.log(newPosition)
  console.log(imgClicked)
  if (imgClicked) {
    newPosition.appendChild(imgClicked);
  }
}

function makeCookies() {
  let makeCookies = document.createElement('IMG');
  makeCookies.setAttribute('src', cookieCheckers.imgSrc);
}

function makeCarrots() {
  let makeCarrots = document.createElement('IMG');
  makeCarrots.setAttribute('src', carrotCheckers.imgSrc);
}
// Handle click on Reset button
  // Initialize state variables 
  // Render browser
