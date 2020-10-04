<template>
  <div class="container">
    <el-button @click="postExport" :loading="loading">post导出</el-button>
  </div>
</template>

<script>
import api from '@/api/demo.js'
import { commExportExcel } from '@/utils/index.js'

export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    postExport () {
      this.loading = true

      api('postExport', {}).then(data => {
        this.loading = false

        commExportExcel(data, 'excel', 'xlsx')
      })
    }
  }
}
</script>
