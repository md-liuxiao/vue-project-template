<template>
  <div>
  </div>
</template>

<script>
import req from 'api/test.js'

export default {
  data () {
    return {

    }
  },
  created () {
    console.log('helloword', req)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
