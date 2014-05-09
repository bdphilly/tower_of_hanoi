(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  var TowersUI = Hanoi.TowersUI = function (game) {
    this.game = game;
    this.startPile = null;
    this.endPile = null;
  }

  TowersUI.prototype.render = function () {
    $('.pile').empty();
    var pileID = '#pile';

    this.game.towers.forEach(function (tower, pileIndex) {
      tower.forEach(function (disk) {
        $(pileID + pileIndex)
         .prepend('<div id="disk' + disk + '" class="disk"></div>');
      });
    });
  };

  $(document).ready(function () {
    towersUI.render();
    $('.pile').on('click', function(event) {

      if (event.target.id.slice(0,4) === 'disk') {
        var target = $(event.target).parent();
      } else {
        var target = $(event.target);
      }
      if (towersUI.startPile !== null) {
        towersUI.endPile = target.data('pile');
        if (towersUI.game.move(towersUI.startPile, towersUI.endPile)) {
          towersUI.startPile = null;
          towersUI.endPile = null;
        } else {
          towersUI.startPile = null;
          towersUI.endPile = null;
        }
        $('.pile').removeClass('highlighted');
      } else {
        towersUI.startPile = target.data('pile');
        target.addClass('highlighted');
      }
      towersUI.render();
      if (towersUI.game.isWon()) {
        alert("You won!");
      }
    });

  });
})(this);