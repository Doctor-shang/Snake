// 背景坐标
const BASE_X_POINT = 10;
const BASE_Y_POINT = 10;
// 宽度系数
const XLEN = 30;
const YLEN = 30;
// 方块大小
const SQUAREWIDTH = 20;
// 方向
var DIRECTIONENUM = {
    LEFT: {
        x: -1,
        y: 0
    },
    RIGHT: {
        x: 1,
        y: 0
    },
    TOP: {
        x: 0,
        y: -1
    },
    BOTTOM: {
        x: 0,
        y: 1
    },
}

// 基类
function Square(x, y, width = SQUAREWIDTH, height = SQUAREWIDTH, dom = document.createElement('div')) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom
}
Square.prototype.touch = function () {
    console.log('touch')
}
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = this.x * SQUAREWIDTH + 'px';
    this.viewContent.style.top = this.y * SQUAREWIDTH + 'px';
}
// new Square(10, 20, SQUAREWIDTH, SQUAREWIDTH, dom)
var Floor = tool.extends(Square);
var Store = tool.extends(Square);
var Food = tool.single(Square);
var SpeedFood = tool.single(Square);
var SlowFood = tool.single(Square);
var SnakeHead = tool.single(Square);
var SnakeBody = tool.extends(Square);

var Ground = tool.single(Square);
var Snake = tool.single();
var Game = tool.single();

var STRATEGYENUM = {
    move: 'MOVE',
    eat: 'EAT',
    die: 'DIE',
    speed: 'SPEED',
    slow: 'SLOW'
}