var food = new Food();
food.createFood = function() {
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
    var food = (function () {
        console.log('food')
        if (Math.random() * 10 > 9) {
            return SquareFactory.create('SpeedFood', x, y, 'yellow');
        } else if (Math.random() * 10 > 8) {
            return SquareFactory.create('SlowFood', x, y, '#fff');
        } else {
            return SquareFactory.create('Food', x, y, 'green');
        }
    })()
    oG.append(food)
    // for (var node = oS.head, node) {

    // }
}
