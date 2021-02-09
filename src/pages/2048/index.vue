<template>
  <div class="container">
    <div id="chessboard"></div>
  </div>
</template>

<script>
import Chess from './2048.js'

export default {
  data () {
    return {
    }
  },
  mounted () {
    /* eslint-disable */
    new Chess({
      el: '#chessboard',
      width: 500,
      height: 500,
      rows: 5,
      cols: 5
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
    position: relative;
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

    .marker {
      position: absolute;
      top: 0;
      left: 0;
      color: #ffffff;
      text-align: center;
      font-size: 50px;
      font-weight: bold;
      border-radius: 10px;
    }

    .marker-2 {
      background: rgb(238, 228, 218);
    }
    .marker-4 {
      background: rgb(236, 223, 203);
    }
    .marker-8 {
      background: rgb(242, 177, 121);
    }
    .marker-16 {
      background: rgb(245, 149, 99);
    }
    .marker-32 {
      background: rgb(240, 127, 91);
    }
    .marker-64 {
      background: rgb(246, 93, 59);
    }
    .marker-128 {
      background: rgb(237, 206, 113);
    }
    .marker-256 {
      background: rgb(233, 206, 100);
    }
    .marker-512 {
      background: rgb(228, 201, 87);
    }
    .marker-1024 {
      font-size: 40px;
      background: rgb(176, 131, 173);
    }
    .marker-2048 {
      font-size: 40px;
      background: rgb(102, 105, 193);
    }
    .marker-4096 {
      font-size: 40px;
      background: rgb(157, 82, 168);
    }
  }
}
</style>
