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


// Use classes to create CookiePieces and CarrotPieces
let cookieCheckers = []; 
let carrotCheckers = [];

// loop to make cookies and carrots and push into the cookieCheckers & carrotCheckers arrays
function makeCookies() {
  let cookies = new CookieCheckers('cookies', 'images/icons8-cookie-emoji-48.png',
  'images/icons8-cookie-emoji-96.png', false);
  
  for (let i = 0; i < 12; i++) {
    cookieCheckers.push(cookies);
  }
  return cookieCheckers;
}

function makeCarrots() {
  let carrots = new CarrotCheckers('carrots', 'images/icons8-carrot-48.png',
  'images/icons8-carrot-96.png', false);
  
  for (let i = 0; i < 12; i++) {
    carrotCheckers.push(carrots);
  }
  return carrotCheckers;
}


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
const boardEl = document.querySelectorAll('.black');
const row0El = document.querySelectorAll('.row-0');
const row1El = document.querySelectorAll('.row-1');
const row2El = document.querySelectorAll('.row-2');
const row3El = document.querySelectorAll('.row-3');
const row4El = document.querySelectorAll('.row-4');
const row5El = document.querySelectorAll('.row-5');
const row6El = document.querySelectorAll('.row-6');
const row7El = document.querySelectorAll('.row-7');
console.log(row0El)

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

  // makeCookies();
  // makeCarrots();
  
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
  
  // stageCheckers();
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
  
// for each element in row-0
// if the index of element in row-0 is equal to index of element in the board array board[0],
// and if the element in board[0] is not null
// create an img element and set attribute to objects imgSrc
// then append img element to the element in row-0
  for (let i = 0; i < row0El.length; i++) {
    if (board[0][i] !== null) {
      let cookie = document.createElement('IMG')
      cookie.setAttribute('src', `${board[0][i].imgSrc}`)
      row0El[i].appendChild(cookie);
      console.log(row0El[i])
    } else {
      console.log(board[0][i], 'should be null')
    }
  }

    // nextTurn();
}

// function stageCheckers() {
//   clearBoard();

//   for (let i = 0; i < boardEl.length; i++) {
//     if (i < 12) {
//       let makeCookies = document.createElement('IMG');
//       makeCookies.setAttribute('src', cookieCheckers.imgSrc);
//       boardEl[i].appendChild(makeCookies);
//     } else if (i >= 20) {
//       let makeCarrots = document.createElement('IMG');
//       makeCarrots.setAttribute('src', carrotCheckers.imgSrc);
//       boardEl[i].appendChild(makeCarrots);
//     }
//   }
// }

function clearBoard() {
  boardEl.forEach(cell => cell.hasChildNodes() ? cell.removeChild(cell.firstChild) : cell);
}

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

// function nextTurn() {
//   if (playersTurn === 'cookiesTurn') {
//     turnEls.carrotsTurn.style.backgroundColor = 'grey';
//     turnEls.cookiesTurn.style.backgroundColor = 'none';
  
//     for (let i = 0; i < boardEl.length - 20; i++) {
//       boardEl[i].addEventListener('click', function(e) {
//         console.log(e.target);
//       });
//     } 
//   } else if (playersTurn === 'carrotsTurn') {
//     turnEls.carrotsTurn.style.backgroundColor = 'none';
//     turnEls.cookiesTurn.style.backgroundColor = 'grey';
  
//     for (let i = 20; i < boardEl.length; i++) {
//       boardEl[i].addEventListener('click', function(e) {
//         console.log(e.target);
//       });
//     }  
//   }
// }

// function announceWinner() {
//   if (numOfCookies === 0) {
//     winner = alert('CARROTS WINS!!');
//   } else {
//     winner = alert('COOKIE WINS!!!');
//   }
// }

  // let getChecker = e.target;
  // let getCell = e.currentTarget;
  // let newCell = e.target;
  // // moveCheckers(getChecker, appendChecker)
  // if (getCell.hasChildNodes()) {
  //   cell.removeChild(getChecker);
  // } else {
  //   newCell.appendChild();
  // }
  


// let imgClicked;
// let x = 0;
// let y = 0;
// let newPosition = board[x][y];
// let modes = ['capturing', 'nonCapturing', 'isQueen'];

// function movePositions(imgClicked, currentPosition, newPosition) {
//   currentPosition = board[2][2];
  
  // if (imgClicked && modesnonCapturing) {
  //   newPosition === board[x + 1][y + 1] || newPosition === board[x + 1][y - 1];
  // }
// }

// Handle click on Reset button
  // Initialize state variables 
  // Render browser
// replayBtnEL.addEventListener('click', init);