let Chess = function (options) {
  this.options = options
  // 单个棋子的宽度
  this.chessPiecesWidth = (options.width - 60) / options.rows
  // 单个棋子的高度
  this.chessPiecesHeight = (options.height - 60) / options.cols

  this.chessContainer = document.querySelector(this.options.el)

  this.initChessStyle()
  this.initBaseChessPiece()
}

Chess.prototype.initChessStyle = function () {
  this.chessContainer.style.width = this.options.width + 'px'
  this.chessContainer.style.height = this.options.height + 'px'

  this.chessContainer.className = 'chessboard-container'
}

Chess.prototype.initBaseChessPiece = function () {
  let total = this.options.rows * this.options.cols

  for (let i = 0; i < total; i++) {
    let chessPiece = document.createElement('div')

    chessPiece.className = 'chessboard-item'

    chessPiece.style.width = this.chessPiecesWidth + 'px'
    chessPiece.style.height = this.chessPiecesHeight + 'px'

    this.chessContainer.appendChild(chessPiece)
  }
}

export default Chess
