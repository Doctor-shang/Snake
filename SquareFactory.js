function SquareFactory() {}
SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == undefined) {
        throw 'no this type';
    }
    if (SquareFactory.prototype[type].prototype.__proto__ !== SquareFactory.prototype) {
        SquareFactory.prototype[type].prototype = new SquareFactory();
    }
    var newSquare = new SquareFactory.prototype[type](x, y, color);
    return newSquare
}
SquareFactory.prototype.init = function (square, color, touch) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.backgroundColor = color;
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.left = square.x * SQUAREWIDTH + 'px';
    square.viewContent.style.top = square.y * SQUAREWIDTH + 'px';
    square.touch = function () {
        return touch
    }
}

SquareFactory.prototype.Store = function (x, y, color) {
    var store = new Store(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(store, color, STRATEGYENUM.die);
    return store
}
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(floor, color, STRATEGYENUM.move)
    return floor
}
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(food, color, STRATEGYENUM.eat);
    food.upDate(x, y);
    return food
}
SquareFactory.prototype.SpeedFood = function (x, y, color) {
    var speedFood = new SpeedFood(x, y, SQUAREWIDTH, SQUAREWIDTH);
    speedFood.viewContent.innerText = '快';
    this.init(speedFood, color, STRATEGYENUM.speed);
    speedFood.upDate(x, y);
    return speedFood
}
SquareFactory.prototype.SlowFood = function (x, y, color) {
    var slowFood = new SlowFood(x, y, SQUAREWIDTH, SQUAREWIDTH);
    slowFood.viewContent.innerText = '慢';
    this.init(slowFood, color, STRATEGYENUM.slow);
    slowFood.upDate(x, y);
    return slowFood
}
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(snakeHead, color, STRATEGYENUM.die);
    snakeHead.upDate(x, y);
    return snakeHead
}
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, SQUAREWIDTH, SQUAREWIDTH);
    this.init(snakeBody, color, STRATEGYENUM.die)
    return snakeBody
}
// SquareFactory.prototype = {
//     Store(x,y,color) {
//         var store = new Store(x, y, SQUAREWIDTH, SQUAREWIDTH);
//         return store
//     }
// }