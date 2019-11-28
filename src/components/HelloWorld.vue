<template>
  <div>
    <el-button @click="sendGetReq">发送get请求</el-button>
    <el-button @click="sendPostReq">发送post请求</el-button>
    <el-button @click="postExport">post导出</el-button>
  </div>
</template>

<script>
import req from 'api/test.js'
import exportFile from '../mixins/exportFile.js'

export default {
  mixins: [exportFile],
  data () {
    return {
    }
  },
  methods: {
    postExport () {
      req('portExport', {name: 'tom', age: '10'}).then(data => {
        console.log('data', data)
      })
    },
    sendGetReq () {
      req('getData', {AccessToken: '99fd39f0-1140-4848-be53-278f5fa0fc1c'}).then(data => {
        console.log(data)
      })
    },
    sendPostReq () {
      req('getPostData', {userName: 'admin', passWord: 'zhzxcs@369'}).then(data => {
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
.active {
  color: red;
}
</style>
