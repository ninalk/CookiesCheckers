// Constants
// Board does not change - pieces can move only within the black cells
// Attack can happen only if enemy is diagonally adjacent and empty space is available
// Images of cookies and carrots?

// MODEL
// Set State Variables - these variables can change during the game
  // Use Classes to create each piece
  // Create a class Checkers and instances of Checkers for each player
    // Player 1 - cookie pieces (12)
    // Player 2 - carrot pieces (12)
  // Score board?
    // Player 1 - number of cookie pieces left
    // Player 2 - number of carrot pieces left
  // Player 1 - King piece
  // Player 2 - King piece
  // Player's turn - tells users who's turn it is
  // Winner of game - Player 1 or Player 2 or tie?


// VIEW
// Store elements that need to be accessed multiple times throughout the game
// get ID of all the black cells?
// need ID of every piece
// get ID of Player 1 - need to show whos turn it is
// get ID of Player 2 - need to show whos turn it is
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
    // Position of each player's pieces
    // If empty cell is clicked, player's piece should occupy empty cell
    // If enemy is captured, remove enemy from cell
  // Render scoreboard
    // When enemy is captured, update scoreboard
    // When 0 pieces left, display winner and loser

// Wait for user to click a cell
    
// CONTROLLERS
// Add event listeners to relevant elements
// Handle a player clicking an empty cell
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
