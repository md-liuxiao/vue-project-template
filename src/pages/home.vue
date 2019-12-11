<template>
  <el-container>
    <el-header>header</el-header>
    <el-container>
      <el-aside>

      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.el-container {
  width: 100%;
  height: 100%;

  .el-header {
    box-shadow: 2px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .el-aside {
    background: #67C23A;
    height: 100%;
  }

  .el-main {
    padding: 10px;
  }
}
</style>
