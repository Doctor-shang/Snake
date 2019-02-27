var oS = new Snake();
oS.head = null;
oS.tail = null;

oS.init = function () {
    var SnakeHead = SquareFactory.create('SnakeHead', 3, 1, 'red');
    var SnakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'blue');
    var SnakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'blue');

    // 链表
    SnakeHead.next = SnakeBody1;
    SnakeBody1.next = SnakeBody2;
    SnakeBody2.next = null;

    SnakeHead.prev = null;
    SnakeBody1.prev = SnakeHead;
    SnakeBody2.prev = SnakeBody1;

    this.head = SnakeHead;
    this.tail = SnakeBody2;

    // render
    oG.remove(SnakeHead.x, SnakeHead.y);
    oG.append(SnakeHead);
    
    oG.remove(SnakeBody1.x, SnakeBody1.y);
    oG.append(SnakeBody1);

    oG.remove(SnakeBody2.x, SnakeBody2.y);
    oG.append(SnakeBody2);

    // 默认方向
    this.direction = DIRECTIONENUM.RIGHT;
}
oS.strategies = {
    MOVE: function (oS, square, oG, fromEat) {
        // 新建身体,替代蛇头
        var newBody = SquareFactory.create('SnakeBody', oS.head.x, oS.head.y, 'blue');
        newBody.next = oS.head.next;
        newBody.prev = null;
        newBody.next.prev = newBody;

        oG.remove(oS.head.x, oS.head.y);
        oG.append(newBody);

        // 更新蛇头位置
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'red');
        newHead.next = newBody;
        newHead.prev = null;
        newBody.prev = newHead;

        oG.remove(square.x, square.y);
        oG.append(newHead);
        oS.head = newHead;

        // 删除最后一节蛇身
        if (!fromEat) {
            var floor = SquareFactory.create('Floor', oS.tail.x, oS.tail.y, 'orange');
            oG.remove(floor.x, floor.y);
            oG.append(floor);
            oS.tail = oS.tail.prev;
            oS.tail.next = null;
        }
    },
    EAT: function (oS, square, oG) {
        this.MOVE(oS, square, oG, true);
        food.createFood();
    },
    DIE: function () {
        alert('over');
        game.over();
    },
    SPEED: function (oS, square, oG) {
        this.MOVE(oS, square, oG, true);
        food.createFood();
        game.interval /= 2;
        clearInterval(game.timer);
        game.timer = setInterval(function () {
            oS.move()
        }, game.interval)
        setTimeout(function () {
            console.log('恢复')
            game.interval *= 2;
            clearInterval(game.timer);
            game.timer = setInterval(function () {
                oS.move()
            }, game.interval)
        }, 5000)
    },
    SLOW: function (oS, square, oG) {
        this.MOVE(oS, square, oG, true);
        food.createFood();
        game.interval *= 2;
        clearInterval(game.timer);
        game.timer = setInterval(function () {
            oS.move()
        }, game.interval)
        setTimeout(function () {
            console.log('恢复')
            game.interval /= 2;
            clearInterval(game.timer);
            game.timer = setInterval(function () {
                oS.move()
            }, game.interval)
        }, 5000)
    },
}
// 移动
oS.move = function () {
    // this.head.x + this.direction.x;
    var square = oG.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];
    if (typeof square.touch == 'function') {
        this.strategies[ square.touch() ](this, square, oG)
    }
}
// oS.init()