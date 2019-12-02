<template>
  <div class="file-list-container">
    <ul class="file-list">
      <li class="file-item" v-for="(item, index) in fileList" :key="index">
        <div class="file-name">{{item.fileName}}</div>
        <div class="file-time">{{item.fileLoadTime}}秒</div>
        <div class="file-status">{{item.fileStatus}}</div>
        <div class="down-btn">
          <a :href="item.fileUrl" :download="item.fileName + '.xlsx'">下载文件</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {

  },
  computed: {
    fileList () {
      return this.$store.state.exportFileList
    }
  }
}
</script>

<style lang="scss" scoped>
.file-list-container {
  width: 300px;
  height: 200px;
  border: 1px solid #ddd;

  .file-list {
    width: 100%;
    height: 100%;
    overflow: auto;

    .file-item {
      display: flex;
      font-size: 14px;
      line-height: 25px;
      justify-content: space-between;
      align-items: center;

      .down-btn {
        a {
          text-decoration: none;
          color: #409EFF;
        }
      }
    }
  }
}
</style>
