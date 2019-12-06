<template>
  <div>
    <el-button @click="sendGetReq">发送get请求</el-button>
    <el-button @click="sendPostReq">发送post请求</el-button>
    <el-button @click="postExport">post导出</el-button>
    <el-button @click="openDialog">打开dialog</el-button>
    <export-file-list></export-file-list>
    <i-dialog
      v-model="dialogVisible"
      @close="dialogClose"
      @open="dialogOpen"
      :toolbar="dialogToolbar">

      <el-button round>测试按钮</el-button>
      <el-input></el-input>
      <el-select></el-select>
      <el-date-picker></el-date-picker>
      <el-input-number></el-input-number>
    </i-dialog>
  </div>
</template>

<script>
import req from 'api/test.js'
import ExportFileList from './exportFileList.vue'
import IDialog from '@/components/common/i-dialog/index.vue'
import { treeData, basicArray, objArray } from './data.js'
import { dataFlattening } from '@/utils/index.js'

export default {
  components: {
    ExportFileList,
    IDialog
  },
  data () {
    return {
      dialogVisible: false,
      testDisabled: false,
      dialogToolbar: [
        {
          text: '测试按钮1',
          type: 'success',
          disabled: () => {
            return this.testDisabled
          },
          loading: () => {
            return false
          },
          func: (done) => {
            done()
          }
        },
        {
          text: '测试按钮2',
          type: 'primary',
          disabled: () => {
            return false
          },
          loading: () => {
            return false
          },
          func: (done) => {
          }
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    dialogClose () {
      console.log('关闭dialog')
    },
    dialogOpen () {
      console.log('打开dialog')
    },
    postExport () {
      req('portExport', {
        AccessToken: '90F7112DBB8D4AD575DA4F7979008386',
        pkOrg: '',
        date: '',
        employeeName: ''
      }).then(data => {
        console.log('data', data)
      })
    },
    sendGetReq () {
      req('getData', {AccessToken: '99fd39f0-1140-4848-be53-278f5fa0fc1c'}).then(data => {
        console.log(data)
      })
    },
    sendPostReq () {
      req('getPostData', {}).then(data => {
        console.log(data)
      })
    }
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
