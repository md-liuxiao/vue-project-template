<template>
  <div>
    <div style="height:1000px;" id="test"></div>
    <el-button>测试防抖按钮</el-button>
    <el-button>测试节流按钮</el-button>
  </div>
</template>

<script>
import {debounce, throttle} from '@/utils/index.js'

export default {
  data () {
    return {}
  },
  mounted () {
    window.document.body.onscroll = debounce(function (e) {
      console.log('防抖成功')
    })

    // document.getElementById('test').onclick = debounce(function (e) {
    //   console.log(e)
    //   console.log(this)
    //   console.log('防抖成功')
    // })

    document.getElementById('test').onclick = throttle(function (e) {
      console.log('节流成功')
    })
  },
  methods: {
  }
}
</script>
