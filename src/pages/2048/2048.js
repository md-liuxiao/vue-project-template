let Chess = function (options) {
  let _this = this
  let initX = Math.floor(Math.random() * options.rows)
  let initY = Math.floor(Math.random() * options.cols)

  this.options = options

  /**
   * @params {string} y 棋盘数据模型的y坐标值
   * @params {string} x 棋盘数据模型的x坐标值
   * @params {Object} example 对应坐标的棋子实例
   */
  this.markerList = []

  // 棋盘数据模型
  this.chessModel = this.createChessDataModel()
  // 单个棋子的宽度
  this.chessPiecesWidth = (options.width - ((options.rows + 1) * 10)) / options.rows
  // 单个棋子的高度
  this.chessPiecesHeight = (options.height - ((options.cols + 1) * 10)) / options.cols

  this.chessContainer = document.getElementById(this.options.el)

  this.initChessStyle()
  this.initBaseChessPiece()

  /* eslint-disable */
  // new Marker({x: initX, y: initY, value: 2, width: this.chessPiecesWidth, height: this.chessPiecesHeight, chess: this.chessContainer})

  document.body.onkeyup = function (target) {
    // left
    if (target.keyCode === 37) {
      for (let y = 0; y < _this.chessModel.length; y++) {
        for (let x = 0; x < _this.chessModel[y].length; x++) {
          if (_this.chessModel[y][x] !== 0) {
            _this.leftChange(y, x)
          }
        }
      }

      _this.createNewChess()
    }

    // top
    if (target.keyCode === 38) {
      for (let y = 0; y < _this.chessModel.length; y++) {
        for (let x = 0; x < _this.chessModel[y].length; x++) {
          if (_this.chessModel[y][x] !== 0) {
            _this.topChange(y, x)
          }
        }
      }

      _this.createNewChess()
    }

    // right
    if (target.keyCode === 39) {
      for (let y = 0; y < _this.chessModel.length; y++) {
        for (let x = _this.chessModel[y].length; x >= 0; x--) {
          if (_this.chessModel[y][x] !== 0) {
            _this.rightChange(y, x)
          }
        }
      }

      _this.createNewChess()
    }

    // bottom
    if (target.keyCode === 40) {
      for (let y = _this.chessModel.length - 1; y >= 0 ; y--) {
        for (let x = 0; x < _this.chessModel[y].length; x++) {
          if (_this.chessModel[y][x] !== 0) {
            _this.bottomChange(y, x)
          }
        }
      }

      _this.createNewChess()
    }

    _this.initModelChess()
  }
}

Chess.prototype.leftChange = function (y, x) {
  if (this.chessModel[y][x - 1] === 0) {
    let temp = this.chessModel[y][x]

    this.chessModel[y][x - 1] = temp
    this.chessModel[y][x] = 0

    this.leftChange(y, x - 1)
  } else {
    if (this.chessModel[y][x - 1] === undefined) {
      return
    }

    if (this.chessModel[y][x] === this.chessModel[y][x - 1]) {
      let temp = this.chessModel[y][x]

      this.chessModel[y][x - 1] = temp * 2
      this.chessModel[y][x] = 0
    } else {
      return
    }
  }
}

Chess.prototype.rightChange = function (y, x) {
  if (this.chessModel[y][x + 1] === 0) {
    let temp = this.chessModel[y][x]

    this.chessModel[y][x + 1] = temp
    this.chessModel[y][x] = 0

    this.rightChange(y, x + 1)
  } else {
    if (this.chessModel[y][x + 1] === undefined) {
      return
    }

    if (this.chessModel[y][x] === this.chessModel[y][x + 1]) {
      let temp = this.chessModel[y][x]

      this.chessModel[y][x + 1] = temp * 2
      this.chessModel[y][x] = 0
    } else {
      return
    }
  }
}

Chess.prototype.topChange = function (y, x) {
  if (this.chessModel[y - 1] && this.chessModel[y - 1][x] === 0) {
    let temp = this.chessModel[y][x]

    this.chessModel[y - 1][x] = temp
    this.chessModel[y][x] = 0
    
    this.topChange(y - 1, x)
  } else {
    if (this.chessModel[y - 1] === undefined) {
      return
    }

    if (this.chessModel[y][x] === this.chessModel[y - 1][x]) {
      let temp = this.chessModel[y][x]

      this.chessModel[y - 1][x] = temp * 2
      this.chessModel[y][x] = 0
    } else {
      return
    }
  }
}

Chess.prototype.bottomChange = function (y, x) {
  if (this.chessModel[y + 1] && this.chessModel[y + 1][x] === 0) {
    let temp = this.chessModel[y][x]

    this.chessModel[y + 1][x] = temp
    this.chessModel[y][x] = 0
    
    this.bottomChange(y + 1, x)
  } else {
    if (this.chessModel[y + 1] === undefined) {
      return
    }

    if (this.chessModel[y][x] === this.chessModel[y + 1][x]) {
      let temp = this.chessModel[y][x]

      this.chessModel[y + 1][x] = temp * 2
      this.chessModel[y][x] = 0
    } else {
      return
    }
  }
}

// 创建一个新的棋子实例
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
  let str = ''

  // 根据棋盘数据模型渲染棋子实例
  for (let y = 0; y < this.chessModel.length; y++) {
    for (let x = 0; x < this.chessModel[y].length; x++) {
      str = str + this.chessModel[y][x] + ' '
      if (this.chessModel[y][x]) {
        let index = this.markerList.findIndex(item => {
          return item.x === x && item.y === y
        })

        /* eslint-disable */

        if (index < 0) {
          let marker = new Marker({x: x, y: y, value: this.chessModel[y][x], width: this.chessPiecesWidth, height: this.chessPiecesHeight, chess: this.chessContainer})
          this.markerList.push({y: y, x: x, example: marker})
        } else {
          let marker = new Marker({x: x, y: y, value: this.chessModel[y][x], width: this.chessPiecesWidth, height: this.chessPiecesHeight, chess: this.chessContainer})
        }
      } else {
        let index = this.markerList.findIndex(item => {
          return item.x === x && item.y === y
        })

        if (index >= 0) {
          this.markerList[index].example.markerClear(`marker${y}-${x}`, this.options.el)
          this.markerList.splice(index, 1)
        }

      }
    }

    str += '\n'
  }

  console.log(str)
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
  div.id = `marker${this.y}-${this.x}`

  markerOptions.chess.appendChild(div)
}

/**
 * 
 * @param {string} id 通过传入的id获取对应的dom节点
 * @param {string} chessContainerId 棋盘容器的id
 */
Marker.prototype.markerClear = function (id, chessContainerId) {
  let chess = document.getElementById(chessContainerId)

  document.querySelectorAll(`#${id}`).forEach(item => {
    chess.removeChild(item)
  })
}

export default Chess
