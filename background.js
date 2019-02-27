var oG = new Ground(BASE_X_POINT, BASE_Y_POINT, XLEN * SQUAREWIDTH, YLEN * SQUAREWIDTH);
oG.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.backgroundColor = 'yellow';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    document.body.appendChild(this.viewContent)

    this.SquareTable = []
    for (let i = 0; i < YLEN; i++) {
        this.SquareTable[i] = new Array(30)
        for (let j = 0; j < XLEN; j++) {
            var newSquare = null;
            if (i == 0 || i == YLEN - 1 || j == 0 || j == XLEN - 1) {
                newSquare = SquareFactory.create('Store', j, i, 'black')
            } else {
                newSquare = SquareFactory.create('Floor', j, i, 'orange')
            }
            this.SquareTable[i][j] = newSquare;
            this.viewContent.appendChild(newSquare.viewContent)
        }
    }
}
// 移除格子
oG.remove = function (x,y) {
    var square = this.SquareTable[y][x];
    this.viewContent.removeChild(square.viewContent)
}
// 
oG.append = function (square) {
    this.viewContent.appendChild(square.viewContent)
    this.SquareTable[square.y][square.x] = square
}
// oG.init();

// i 行 j 列
