<template>
  <div>
    <el-button @click="sendGetReq">发送get请求</el-button>
    <el-button @click="sendPostReq">发送post请求</el-button>
    <el-button @click="postExport">post导出</el-button>
    <el-button @click="changeStore">修改store</el-button>
    <ul>
      <li v-for="(item, index) in fileList" :key="index">
        <div>{{item.fileId}}</div>
        <div>{{item.fileName}}</div>
        <div>{{item.fileLoadTime}}s</div>
        <div>{{item.fileStatus}}</div>
        <a :href="item.fileUrl" download="excel.xlsx">{{item.fileName}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
import req from 'api/test.js'
import exportFile from '../mixins/exportFile.js'
import { treeData } from './data.js'
import { dataFlattening } from '@/utils/index.js'

export default {
  mixins: [exportFile],
  data () {
    return {
    }
  },
  computed: {
    fileList () {
      return this.$store.state.exportFileList
    }
  },
  methods: {
    changeStore () {
      this.$store.commit('changeCount', 10)
    },
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
      req('getPostData', {}).then(data => {
        console.log(data)
      })
    }
  },
  mounted () {
    // console.log(dataFlattening(treeData))
    // console.log(dataFlattening)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.active {
  color: red;
}
</style>
