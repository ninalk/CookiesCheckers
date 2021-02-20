/*----- constants -----*/
// Constants
// Images of cookies and carrots including king pieces (larger images)
class Checkers {
  constructor(player, imgSrc, kingImgSrc, isKing) {
    this.player = player;
    this.imgSrc = imgSrc;
    this.kingImgSrc = kingImgSrc;
    this.isKing = isKing;
  }
}

// Subclasses of Checkers class
class CookieCheckers extends Checkers {
  constructor(player, imgSrc, kingImgSrc, isKing) {
    super(player, imgSrc, kingImgSrc, isKing);
  }
}

class CarrotCheckers extends Checkers {
  constructor(player, imgSrc, kingImgSrc, isKing) {
    super(player, imgSrc, kingImgSrc, isKing);
  }
}


// Attack can happen only if enemy is diagonally adjacent and empty space is available


/*----- app's state (variables) -----*/
// MODEL
// Set State Variables - these variables can change during the game
// Represent the board with nested arrays
  // populate an element (ie image of each piece) with a piece object and null 
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
  // pieces can be stored in an object
  // each player has a total number of pieces
  // Player 1 - cookie pieces (12)
  // Player 2 - carrot pieces (12)
let cookieCheckers = new CookieCheckers('cookies', 'images/icons8-cookie-emoji-48.png',
  'images/icons8-cookie-emoji-96.png', false);
  console.log(cookieCheckers)
  
let carrotCheckers = new CarrotCheckers('carrots', 'images/icons8-carrot-48.png',
  'images/icons8-carrot-96.png', false);
  console.log(carrotCheckers)
  
let numOfCheckers;
let winner;

// When a piece becomes a King? Change image to larger image
  // Player 1 - Cookie King pieces
  // Player 2 - Carrot King pieces
// Player's turn - tells users who's turn it is
  // Randomly generate who goes first and style div that holds turn
let playersTurn;

/*----- cached element references -----*/
// VIEW
// Store elements that need to be accessed multiple times throughout the game
// need ID of every piece?
// get ID of Cookie's turn which is same element that holds the num of pieces 
  // need to show whos turn it is
let cookiesTurnEl = document.getElementById('cookies-turn');

// get ID of Carrots turn which is the same element that holds the num of pieces
// need to show whos turn it is
let carrotsTurnEl = document.getElementById('carrots-turn');

// get ID of Reset button - reset game
let resetBtnEL = document.getElementById('replay-btn');

// get ID of score aka number of checkers left for each player
let numOfCookiesEl = document.getElementById('num-of-cookies');
let numOfCarrotsEl = document.getElementById('num-of-carrots');

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
    cookies: true,
    carrots: false
  }

  numofCheckers = {
    cookies: 12,
    carrots: 12
  }

  


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

// Handle click on Reset button
  // Initialize state variables 
  // Render browser
