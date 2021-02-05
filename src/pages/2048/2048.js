let Chess = function (options) {
  this.options = options

  this.chessModel = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ]

  // 单个棋子的宽度
  this.chessPiecesWidth = (options.width - ((options.rows + 1) * 10)) / options.rows
  // 单个棋子的高度
  this.chessPiecesHeight = (options.height - ((options.cols + 1) * 10)) / options.cols

  this.chessContainer = document.querySelector(this.options.el)

  this.initChessStyle()
  this.initBaseChessPiece()

  let initX = Math.floor(Math.random() * 4)
  let initY = Math.floor(Math.random() * 4)

  /* eslint-disable */
  new Marker({x: initX, y: initY, value: 2, width: this.chessPiecesWidth, height: this.chessPiecesHeight, chess: this.chessContainer})

  // 根据棋盘数据模型渲染棋子实例
  for (let y = 0; y < this.chessModel.length; y++) {
    for (let x = 0; x < this.chessModel.length; x++) {
      if (this.chessModel[y][x] !== 0) {
        /* eslint-disable */
        new Marker({x: x, y: y, value: this.chessModel[y][x], width: this.chessPiecesWidth, height: this.chessPiecesHeight, chess: this.chessContainer})
      }
    }
  }
}

// 初始化棋盘
Chess.prototype.initChessStyle = function () {
  this.chessContainer.style.width = this.options.width + 'px'
  this.chessContainer.style.height = this.options.height + 'px'

  this.chessContainer.className = 'chessboard-container'
}

// 初始化背景棋子
Chess.prototype.initBaseChessPiece = function () {
  let total = this.options.rows * this.options.cols

  this.chessContainer.innerHTML = ''

  for (let i = 0; i < total; i++) {
    let chessPiece = document.createElement('div')

    chessPiece.className = 'chessboard-item'

    chessPiece.style.width = this.chessPiecesWidth + 'px'
    chessPiece.style.height = this.chessPiecesHeight + 'px'

    this.chessContainer.appendChild(chessPiece)
  }
}

let Marker = function (markerOptions) {
  this.x = markerOptions.x
  this.y = markerOptions.y
  this.value = markerOptions.value

  let div = document.createElement('div')

  div.innerHTML = markerOptions.value

  div.style.width = markerOptions.width + 'px'
  div.style.height = markerOptions.height + 'px'
  div.style.lineHeight = markerOptions.height + 'px'
  div.style.top = (this.y * markerOptions.height) + (this.y + 1) * 10 + 'px'
  div.style.left = (this.x * markerOptions.width) + (this.x + 1) * 10 + 'px'

  div.className = `marker marker-${markerOptions.value}`

  markerOptions.chess.appendChild(div)
}

export default Chess
