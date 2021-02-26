<img src="https://i.imgur.com/SFGR7bc.png?1">

# Welcome to Cookie's Checkers!!

## Introduction

The inspiration for this game came from my sweet dog, Cookie, who loved being outdoors in the company of his human friends. However, he had his sneaky ways of getting into their bags in search for baby carrots. His begging was in the form of an intense stare and his human counterparts would give in easily.

This is not your traditional checker game! Play a game with a friend and see if Cookie can win some more carrots! 

---
 
## Screenshots: 

<img src="https://i.imgur.com/MEX7cku.png">
<img src="https://i.imgur.com/HDTA4J2.png">
<img src="https://i.imgur.com/WFr1nqP.png">

## Wireframe:

The image below shows the logic I used for preventing and allowing pieces to move accordingly. The board is 2D array that allows me to use the index of the pieces positions to move as necessary.
<img src="https://i.imgur.com/kJ6rGWq.jpg?1">

## Technologies Used:

1. JavaScript
2. HTML
3. CSS

## Getting Started: 

Check out the game here: [Cookie's Checkers](https://ninalk.github.io/CookiesCheckers/)

## How to play:

**Here are the rules:**

1. Cookie always goes first and the player alternates after **one** move (aka one jump). **No double jumping allowed!**
2. Cookies and carrot checker pieces can only move diagonally forward left or right from their respective positions.
* If moving into an empty cell, the pieces can only move into one space.
* If eating a carrot (or cookie), the piece may jump two spaces.
3. When a cookie or carrot makes it to the opposite end, the piece enlarges and becomes a queen!
4. A queen is entitled to roam anywhere on the board. However, it may only eat its counterpart when it is adjacent to the piece in any direction.
5. Winner is determined by the number of pieces left. Each player starts with 12 pieces so the first to zero loses!
6. Press **PLAY AGAIN** to reset game and start again.

## Next Steps:

1. Implement logic for Queen's ability to capture pieces in any space diagonally available.
2. Have the ability to double or triple jump and update scores accordingly.
3. Style valid options when its a players turn.
4. Include a cookie or carrot explosion to render winner.