Game.prototype.run = function() {
  var that = this;

  this.makeTurn( function () {
    if (that.checkForWin()) {
      console.log("Congrats! You won!");
      READER.close();
    } else {
      that.run();
    }
  });
}

Game.prototype.makeTurn = function(callback) {
  var that = this;

  READER.question("What pile from?", function(ans) {
    var from = parseInt(ans);
    READER.question("What pile to?", function(ans) {
      var to = parseInt(ans);

      if (that.isValidMove(from, to)) {
        that.makeMove(from, to);
      } else {
      	console.log("Invalid move. Please go again.");
      	that.makeTurn(callback);
      }
      that.display();
      callback();
    });
  });
}

Game.prototype.makeMove = function(pile1, pile2) {
  var discToMove = this.stacks[pile1 - 1].pop();
  this.stacks[pile2 - 1].push(discToMove);
}

Game.prototype.display = function() {
  for (var i = 0; i < this.stacks.length; i++) {
    console.log("Stack " + (i+1) + ": " + this.stacks[i]);
  }
  console.log();
}

Game.prototype.isValidMove = function(from, to) {
  var pileFrom = this.stacks[from - 1];
  var pileTo = this.stacks[to - 1];
  var discToMove = pileFrom[pileFrom.length - 1];
  return (pileTo.length === 0 || pileTo[pileTo.length - 1] > discToMove );
}

Game.prototype.checkForWin = function() {
  return (this.stacks[1].length ===  this.totalDiscs ||
    this.stacks[2].length === this.totalDiscs);
}

function Game (numDiscs) {
  var readline = require('readline');
  READER = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  this.totalDiscs = numDiscs;
  var pile1 = [];

  for (var i = numDiscs; i > 0; i--) {
    pile1.push(i);
  }
  this.stacks = [pile1, [], []];
}

game = new Game(3);

game.display();

game.run();