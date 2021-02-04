<template>
  <div class="container">
    <div id="chessboard">
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
    this.$nextTick(() => {
      /* eslint-disable */
      new Chess({
        el: '#chessboard',
        width: 500,
        height: 500,
        rows: 5,
        cols: 5
      })
    })
  },
  methods: {

  }
}
</script>

<style lang="scss">
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
    border-radius: 20px;
    background: #BCAD9E;

    .chessboard-item {
      border-radius: 10px;
      background: #D6CDC4;
      margin-top: 10px;
      margin-left: 10px;
    }
  }
}
</style>
