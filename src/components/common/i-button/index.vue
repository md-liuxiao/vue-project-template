<template>
  <div class="i-button-container">
    <el-button :type="type" :icon="icon" :class="definedType">
      <slot></slot>
    </el-button>
  </div>
</template>

<script>
export default {
  props: {
    definedType: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>

<style lang="scss" scoped>
.i-button-container {
  display: inline-block;
}
</style>
