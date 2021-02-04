let Chess = function (options) {
  // let chessContainer = document.getElementById(options.el)

  this.options = options

  this.chessContainer = document.getElementById(this.options.el)

  setChessStyle.call(this)
}

let setChessStyle = function () {
  console.log('this', this)
  this.chessContainer.width = this.options.width + 'px'
  this.chessContainer.height = this.options.height + 'px'
  
  this.chessContainer.className = 'chessboard-container'
}
// Chess.prototype.setChessStyle = function () {
// }

export default Chess
