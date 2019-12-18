<template>
  <div>
    <el-button @click="postExport">post导出</el-button>
    <el-button @click="openDialog">打开dialog</el-button>
    <el-button @click="testVisible = !testVisible">查询</el-button>
    <!-- <export-file-list></export-file-list> -->
    <i-dialog
      v-model="dialogVisible"
      @close="dialogClose"
      @open="dialogOpen"
      :toolbar="dialogToolbar">

      <el-button round>测试按钮</el-button>
      <el-input></el-input>
      <el-select></el-select>
      <el-date-picker></el-date-picker>
      <el-input-number></el-input-number>
    </i-dialog>

    <i-table
      :table="table"
      selectType="radio"
      @selectionChange="selectionChange"
      @selectionRadioChange="selectionRadioChange"
      @rowClick="rowClick"
      @search="search">
    </i-table>

    <i-table
      v-if="testVisible"
      :table="table"
      selectType="radio"
      @selectionChange="selectionChange"
      @selectionRadioChange="selectionRadioChange"
      @rowClick="rowClick"
      @search="search">
    </i-table>

  </div>
</template>

<script>
import req from 'api/test.js'
import ExportFileList from './exportFileList.vue'
import IDialog from '@/components/common/i-dialog/index.vue'
import { treeData, basicArray, objArray } from './data.js'
import { dataFlattening } from '@/utils/index.js'
import ITable from '@/components/common/i-table'

export default {
  components: {
    ExportFileList,
    IDialog,
    ITable
  },
  data () {
    return {
      dialogVisible: false,
      testDisabled: false,
      testVisible: false,
      dialogToolbar: [
        {
          text: '测试按钮1',
          type: 'success',
          disabled: () => {
            return this.testDisabled
          },
          loading: () => {
            return false
          },
          func: (done) => {
            done()
          }
        },
        {
          text: '测试按钮2',
          type: 'primary',
          disabled: () => {
            return false
          },
          loading: () => {
            return false
          },
          func: (done) => {
          }
        }
      ],
      table: {
        data: [],
        toolbar: [
          {
            text: '测试表格按钮',
            type: 'success',
            // disabled: () => {
            //   return true
            // },
            // loading: () => {
            //   return false
            // },
            func: () => {
            }
          },
          {
            text: '测试表格按钮2',
            type: 'primary',
            // disabled: () => {
            //   return true
            // },
            // loading: () => {
            //   return false
            // },
            func: () => {
            }
          }
        ],
        columns: [
          {label: '用户名称', prop: 'user_name'},
          {label: '用户身高', prop: 'user_height'},
          {label: '用户编号', prop: 'user_code'},
          {label: '媒体类型', prop: 'media_type', display: {dict: 'DICT_MEDIA_TYPE'}},
          {label: '身份类型', prop: 'card_type', display: {dict: 'DICT_CARD_TYPE'}},
          {label: '时间', prop: 'time', display: {date: 'YYYY-MM-DD'}}
        ],
        pageInfo: {
          pageIndex: 1,
          pageSize: 10,
          total: 100
        }
      }
    }
  },
  computed: {
  },
  methods: {
    selectionChange (selection) {
      console.log('selection', selection)
    },
    selectionRadioChange (currentRow) {
      console.log('currentRow', currentRow)
    },
    rowClick (row, column, event) {
      console.log('rowClick', row)
    },
    search () {
      this.getTableData()
    },
    openDialog () {
      this.dialogVisible = true
    },
    dialogClose () {
      console.log('关闭dialog')
    },
    dialogOpen () {
      console.log('打开dialog')
    },
    postExport () {
      req('portExport', {
        AccessToken: '90F7112DBB8D4AD575DA4F7979008386',
        pkOrg: '',
        date: '',
        employeeName: ''
      }).then(data => {
        console.log('data', data)
      })
    },
    getTableData () {
      req('getTableData', {}).then(data => {
        this.table.data = data
      })
    }
  },
  created () {
  },
  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
