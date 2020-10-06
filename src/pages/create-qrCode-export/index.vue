<template>
  <div class="container">
    <ul class="qrCode-list">
      <li v-for="(item, index) in qrList" :key="index">
        <div :id="item.element" class="qrcode-image"></div>
        <div class="info">{{item.info}}</div>
      </li>
    </ul>

    <el-button :loading="loading" type="primary" @click="exportQrCode" class="downBtn">打包下载所有二维码</el-button>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import JSZip from 'jszip'
import html2canvas from 'html2canvas'
import { saveAs } from 'file-saver'

export default {
  data () {
    return {
      loading: false,
      qrList: [
        {
          element: 'baidu',
          info: '百度首页',
          toPath: 'https://www.baidu.com/'
        },
        {
          element: 'tengxun',
          info: '腾讯首页',
          toPath: 'https://www.qq.com/'
        },
        {
          element: 'jingdong',
          info: '京东首页',
          toPath: 'https://www.jd.com/'
        }
      ]
    }
  },
  mounted () {
    this.qrList.forEach(item => {
      this.createQrCode(item.element, item.toPath)
    })
  },
  methods: {
    createQrCode (element, url) {
      let qrCode = new QRCode(element, {
        width: 100,
        height: 100,
        render: 'canvas', // 设置渲染方式 table canvas
        typeNumber: -1, // 计算模式
        correctLevel: 0, // 纠错等级
        background: '#ffffff', // 背景颜色
        foreground: '#000000', // 前景颜色
        text: url // 链接（http开头的，自动跳状态链内容）或者文字
      })
    },
    exportQrCode () {
      this.loading = true

      let zip = new JSZip()
      let img = zip.folder('images')
      let promiseList = []

      this.qrList.forEach((item, index) => {
        promiseList.push(html2canvas(document.querySelectorAll('.qrCode-list li')[index]))
      })

      Promise.all(promiseList).then(dataList => {
        dataList.forEach((item, index) => {
          let imgData = item.toDataURL('image/png').split('base64,')[1]

          img.file(this.qrList[index].info + '.png', imgData, {base64: true})
        })

        zip.generateAsync({type: 'blob'}).then((content) => {
          saveAs(content, '统一导出二维码.zip')

          this.loading = false
        })
      })
    }
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
  margin: 10px;
  padding: 10px;

  .downBtn {
    display: block;
    margin: 20px auto 0;
  }

  .qrCode-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    li {
      position: relative;
      width: 230px;
      height: 360px;
      background-image: url('../../../static/images/qr_code_bg.jpg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-right: 10px;
      margin-bottom: 10px;

      .qrcode-image {
        position: absolute;
        top: 105px;
        left: 50%;
        transform: translate(-50%, 0);
      }

      .info {
        position: absolute;
        bottom: 100px;
        left: 50%;
        transform: translate(-50%, 0);
        color: #40e495;
        color: #25aae1;
        font-size: 20px;
      }
    }
  }
}
</style>
