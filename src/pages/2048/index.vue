<template>
  <div class="container">
    <div id="chessboard">
      <!-- <div class="chessboard-item" v-for="(item, index) in itemCount" :key="index"></div> -->
    </div>
  </div>
</template>

<script>
import Chess from './2048.js'

export default {
  data () {
    return {
      itemCount: 25
    }
  },
  mounted () {
    new Chess({
      el: 'chessboard'
    })
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

  .chessboard-container {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    // width: 560px;
    // height: 560px;
    border-radius: 20px;
    background: #BCAD9E;

    .chessboard-item {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      background: #D6CDC4;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>
