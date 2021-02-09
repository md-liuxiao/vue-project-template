let Chess = function (options) {
  let _this = this
  let initX = Math.floor(Math.random() * options.rows)
  let initY = Math.floor(Math.random() * options.cols)

  this.options = options

  // 棋盘数据模型
  this.chessModel = this.createChessDataModel()
  // 单个棋子的宽度
  this.chessPiecesWidth = (options.width - ((options.rows + 1) * 10)) / options.rows
  // 单个棋子的高度
  this.chessPiecesHeight = (options.height - ((options.cols + 1) * 10)) / options.cols

  this.chessContainer = document.querySelector(this.options.el)

  this.initChessStyle()
  this.initBaseChessPiece()

  /* eslint-disable */
  new Marker({x: initX, y: initY, value: 2, width: this.chessPiecesWidth, height: this.chessPiecesHeight, chess: this.chessContainer})

  document.body.onkeyup = function (target) {
    _this.createNewChess()

    if (target.keyCode === 37) {
      console.log(111)
    }

    if (target.keyCode === 38) {
      console.log(222)
    }

    if (target.keyCode === 39) {
      console.log(333)
    }

    if (target.keyCode === 40) {
      console.log(444)
    }

    _this.initModelChess()
  }
}

Chess.prototype.createNewChess = function () {
  let x = Math.floor(Math.random() * this.options.rows)
  let y = Math.floor(Math.random() * this.options.cols)

  if (this.validateLost()) {
    console.log('你输了')

    return
  }

  if (!this.chessModel[y][x]) {
    let result = Math.round(Math.random())

    if (result === 1) {
      this.chessModel[y][x] = 2
    } else {
      this.chessModel[y][x] = 4
    }

    return
  } else (
    this.createNewChess()
  )
}

// 根据棋盘模型初始化棋子实例
Chess.prototype.initModelChess = function () {
  // 根据棋盘数据模型渲染棋子实例
  for (let y = 0; y < this.chessModel.length; y++) {
    for (let x = 0; x < this.chessModel.length; x++) {
      if (this.chessModel[y][x]) {
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

// 初始化棋盘数据模型
Chess.prototype.createChessDataModel = function () {
  let arr = new Array()

  for (let y = 0; y < this.options.cols; y++) {
    arr[y] = []

    for (let x = 0; x < this.options.rows; x++) {
      arr[y][x] = 0
    }
  }

  return arr
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

// 判断是否输了
Chess.prototype.validateLost = function () {
  let result = true

  for (let y = 0; y < this.options.cols; y++) {
    for (let x = 0; x < this.options.rows; x++) {
      // 如果存在一个为0的棋子，证明没有输，反之，证明输了
      if (!this.chessModel[y][x]) {
        return false
      }
    }
  }

  return result
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
