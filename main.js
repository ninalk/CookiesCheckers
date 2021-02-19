// Constants
// Board does not change - pieces can move only within the black cells
// Attack can happen only if enemy is diagonally adjacent and empty space is available
// Images of cookies and carrots including king pieces (larger images)

// MODEL
// Set State Variables - these variables can change during the game
  // Represent the board with nested arrays
    // populate an element (ie image of each piece) with a piece object and null 
    // can represent an empty space
  // Use classes to create CookiePieces and CarrotPieces
    // pieces can be stored in an object
    // each player has a total number of pieces
    // Player 1 - cookie pieces (12)
    // Player 2 - carrot pieces (12)
  // When a piece becomes a King? Change image to larger image
    // Player 1 - Cookie King pieces
    // Player 2 - Carrot King pieces
  // Player's turn - tells users who's turn it is
    // Randomly generate who goes first and style div that holds turn


// VIEW
// Store elements that need to be accessed multiple times throughout the game
// need ID of every piece?
// get ID of Cookie's turn which is same element that holds the num of pieces 
  // need to show whos turn it is
// get ID of Carrots turn which is the same element that holds the num of pieces
  // need to show whos turn it is
// get ID of Reset button - reset game
// get ID of King cells 


// CALLBACK FUNCTIONS 
// Init function - what the users see upon loading the browser
  // Initialize Player's turn
  // Each player should have all 12 pieces on the board in designated cells
  // No player should have a King piece
  // State of the game - the scoreboard should show 12:12

// Render function - responsible for transferring all state variables
  // Render the board
    // Populate each player's pieces in designated cell on the board
    // If empty cell is clicked, player's piece should occupy empty cell
    // If enemy is captured, remove enemy from cell
  // Render scoreboard
    // When enemy is captured, update scoreboard
    // When 0 pieces left, display winner and loser

// Wait for user to click a cell
    
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
