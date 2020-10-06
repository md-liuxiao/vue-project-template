<template>
  <div class="container">
    <span>Hello World</span>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

span {
  text-align: center;
  background-image: linear-gradient(to right, #25aae1, #40e495);
  -webkit-background-clip: text;
  color: transparent;
  font-size: 50px;
}
</style>
