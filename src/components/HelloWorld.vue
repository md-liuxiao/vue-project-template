<template>
  <div>
    <el-button @click="sendGetReq">发送get请求</el-button>
    <el-button @click="sendPostReq">发送post请求</el-button>
    <el-button @click="postExport">post导出</el-button>
    <export-file-list></export-file-list>
  </div>
</template>

<script>
import req from 'api/test.js'
import ExportFileList from './exportFileList.vue'

export default {
  components: {
    ExportFileList
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
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
