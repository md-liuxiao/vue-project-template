<template>
  <div class="i-dialog-container">
    <el-dialog
      ref="dialog"
      v-mousemove="dialogMove"
      :visible.sync="visible"
      :title="title"
      :width="width"
      @open="dialogOpen"
      @close="dialogClose"
      :close-on-click-modal="closeOnClickModal"
      :close-on-press-escape="true"
      custom-class="i-dialog">

      <slot></slot>

      <div slot="footer" class="i-dialog-footer">
        <el-button
          v-for="(item, index) in toolbar"
          :key="index"
          :type="item.type"
          :disabled="item.disabled()"
          :loading="item.loading()"
          @click="toolbarBtnClick(item)">

          {{item.text}}

        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },

    /**
     * dialog标题
     */
    title: {
      type: String,
      default: '默认标题'
    },

    /**
     * dialog宽度
     */
    width: {
      type: String,
      default: '50%'
    },

    /**
     * 是否可以通过点击遮罩关闭dialog
     */
    closeOnClickModal: {
      type: Boolean,
      default: false
    },

    /**
     * dialog脚部按钮
     * @param {String} text 按钮文字内容
     * @param {String} type 按钮类型
     * @param {Function} loading loading按钮
     * @param {Function} disabled 禁用按钮
     * @param {Function} func 点击时触发的方法
     */
    toolbar: {
      type: Array,
      default: () => {
        return []
      }
    },

    /**
     * dialog是否支持可拖拽
     */
    dialogMove: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    done () {
      this.toolbar.forEach(item => {
        item.loading = () => {
          return false
        }
      })
    },
    toolbarBtnClick (btn) {
      if (btn.func) {
        btn.func(this.done)
      }
    },
    // dialog打开事件
    dialogOpen () {
      // 打开dialog时，初始化dialog位置
      let dialog = document.querySelector('.i-dialog')

      dialog.style.top = '50px'
      dialog.style.left = '50%'
      dialog.style.transform = 'translate(-50%, 0)'

      this.$emit('input', true)
      this.$emit('open')
    },
    // dialog关闭事件
    dialogClose () {
      this.$emit('input', false)
      this.$emit('close')
    }
  },
  watch: {
    value: {
      handler (value) {
        this.visible = value
        this.$emit('input', value)
      },
      deep: true
    }
  },
  directives: {
    /**
     * @param {Object} el vue自带参数，当前node节点
     * @param {Boolean} arg 是否开启dialog拖拽功能
     */
    mousemove: {
      inserted: function (el, arg) {
        let header = el.childNodes[0].childNodes[0]
        let dialog = el.childNodes[0]

        dialog.style.position = 'absolute'
        dialog.style.top = '50px'
        dialog.style.left = '50%'
        dialog.style.transform = 'translate(-50%, 0)'
        dialog.style.margin = 0

        if (arg.value === false) {
          return
        }

        header.onmousedown = function (target) {
          let afterX = target.offsetX // 鼠标按下时鼠标距离dialog的x值
          let afterY = target.offsetY // 鼠标按下时鼠标距离dialog的y值
          let dialogHeight = el.childNodes[0].offsetHeight
          let dialogWidth = el.childNodes[0].offsetWidth
          let bodyWidth = document.body.offsetWidth
          let bodyHeight = document.body.offsetHeight

          if (target.target.className.includes('el-dialog__close')) {
            return
          }

          document.onmousemove = function (move) {
            dialog.style.transform = ''

            let mouseX = move.clientX // 鼠标移动时鼠标距离body的x值
            let mouseY = move.clientY // 鼠标移动时鼠标距离body的y值

            let x = mouseX - afterX
            let y = mouseY - afterY

            if (x <= 0) {
              x = 0
            }

            if (y <= 0) {
              y = 0
            }

            if (dialogWidth - afterX + mouseX >= bodyWidth) {
              x = bodyWidth - dialogWidth
            }

            if (dialogHeight - afterY + mouseY >= bodyHeight) {
              y = bodyHeight - dialogHeight
            }

            dialog.style.left = x + 'px'
            dialog.style.top = y + 'px'
          }

          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
