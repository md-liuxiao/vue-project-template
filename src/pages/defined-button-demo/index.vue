<template>
  <div class="container">
    <el-form :model="formData" label-position="top">
      <el-form-item label="霓虹效果">
        <i-button definedType="defined-neon-blue">click</i-button>
        <i-button definedType="defined-neon-purple">click</i-button>
        <i-button definedType="defined-neon-yellow">click</i-button>
      </el-form-item>
      <el-form-item label="边框效果">
        <i-button definedType="draw-border">click</i-button>
      </el-form-item>
      <el-form-item label="圆形效果">
        <i-button definedType="circle-btn" icon="el-icon-share">click</i-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import IButton from '@/components/common/i-button/index.vue'

export default {
  components: {
    IButton
  },
  data () {
    return {
      formData: {}
    }
  },
  methods: {
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
  background: #1c2541;

  .el-form {
    /deep/ .el-form-item {
      .el-form-item__label {
        color: #ffffff;
        font-size: 20px;
      }
    }
  }
}
</style>
