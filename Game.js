var game = new Game;
game.timer = null;
game.interval = 100;
game.lock = true;
game.init = function () {
    oG.init();
    oS.init();
    food.createFood();
    // 绑定键盘事件
    document.onkeydown = function (e) {
        if (game.lock) {
            if (e.which == 37 && oS.direction != DIRECTIONENUM.RIGHT) {
                oS.direction = DIRECTIONENUM.LEFT;
            } else if (e.which == 38 && oS.direction != DIRECTIONENUM.BOTTOM) {
                oS.direction = DIRECTIONENUM.TOP;
            } else if (e.which == 39 && oS.direction != DIRECTIONENUM.LEFT) {
                oS.direction = DIRECTIONENUM.RIGHT;
            } else if (e.which == 40 && oS.direction != DIRECTIONENUM.TOP) {
                oS.direction = DIRECTIONENUM.BOTTOM;
            }
            game.onLock();
        }
    }
}
game.onLock = function () {
    this.lock = false;
    console.log(game.lock)
    setTimeout(function () {
        game.lock = true;
    }, this.interval / 2)
}
game.start = function () {
    clearInterval(oG.timer);
    game.timer = setInterval(function () {
        oS.move();
    }, this.interval)
}
game.over = function () {
    clearInterval(this.timer)
}
game.init();
game.start();


function createFood() {
    var x = null;
    var y = null;
    var flag = true;
    while (flag) {
        x = 1 + parseInt(Math.random() * 28);
        y = 1 + parseInt(Math.random() * 28);
        if (oG.SquareTable[y][x].viewContent.style.backgroundColor == 'orange') {
            flag = false;
        }
    }
    var food = SquareFactory.create('Food', x, y, 'green');
    oG.remove(food.x, food.y)
    oG.append(food)
    // for (var node = oS.head, node) {

    // }
}
