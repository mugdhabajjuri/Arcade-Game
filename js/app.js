//Initialize global variables
var X = 200;
var Y = 395;

//Possible y pixel values
var possibleY = [55, 140, 225, 310];

//reset function
function reset() {
  X = 200;
  Y = 395;

}

// Enemies our player must avoid
var Enemy = function() {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
  this.x = 100;
  this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + (dt * 1000 * Math.random());
  if (this.x - X < 55 && this.x - X > 0 && this.y === Y) {
    reset();
  }
  //this lets enemys go back to start after reaching end of canvas
  if (this.x > 505) {
    this.x = -100;
    this.y = possibleY[Math.floor(Math.random() * possibleY.length)];
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = X;
  this.y = Y;
};

Player.prototype.update = function(dt) {
  this.x = X;
  this.y = Y;

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
  switch (key) {
    case 'up':
      //checks if player is off the map
      if (Y <= 85) {
        document.write("<h1>YOU WIN! Refresh to play again.</h1>");
      } else {
        Y -= 85;
      }
      break;
    case 'down':
      if (Y >= 395) {
        reset();
      } else {
        Y += 85;
      }
      break;
    case 'left':
      if (X === 0) {
        reset();
      } else {
        X -= 100;
      }
      break;
    case 'right':
      if (X === 400) {
        reset();
      } else {
        X += 100;
      }

      break;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});