<template>
  <div class="container">
    <div class="info">尝试在容器中移动鼠标!</div>

    <div class="debounce-box">
      防抖:<br/>
      多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行
    </div>

    <div class="throttle-box">
      节流:<br/>
      触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用
    </div>
  </div>
</template>

<script>
import { commDebounce, commThrottle } from '@/utils/index.js'

export default {
  data () {
    return {}
  },
  mounted () {
    let debounceBox = document.querySelector('.debounce-box')
    let throttleBox = document.querySelector('.throttle-box')

    debounceBox.onmousemove = commDebounce((e) => {
      let dotLeft = e.offsetX
      let dotTop = e.offsetY

      this.$message({
        type: 'success',
        message: '触发防抖成功,当前鼠标距离容器左侧' + dotLeft + 'px,距离容器上方' + dotTop + 'px'
      })
    }, 500)

    throttleBox.onmousemove = commThrottle((e) => {
      let dotLeft = e.offsetX
      let dotTop = e.offsetY

      this.$message({
        type: 'success',
        message: '触发防节流成功,当前鼠标距离容器左侧' + dotLeft + 'px,距离容器上方' + dotTop + 'px'
      })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 10px;

  .debounce-box, .throttle-box {
    padding: 50px 20px 0;
    position: absolute;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    width: 50%;
    height: 90%;
    border: 1px solid #aaa;
    cursor: move;
    box-sizing: border-box;
  }

  .debounce-box {
    bottom: 0;
    left: 0;
    background: rgba(76, 201, 240, 0.5);
  }

  .throttle-box {
    bottom: 0;
    right: 0;
    background: rgba(254, 222, 79, 0.5);
  }

  .info {
    font-size: 30px;
    font-weight: bold;
    background-image: linear-gradient(to right, #25aae1, #40e495);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>
