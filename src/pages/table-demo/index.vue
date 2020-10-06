<template>
  <div class="container">
    <i-table
      :table="table"
      @search="searchTable"
      @selectionChange="selectionChange"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @rowClick="rowClick"
      selectType="radio">

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            icon="el-icon-top"
            circle
            type="info"
            @click="sortTop(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </i-table>

    <i-dialog
      v-model="dialogVisible"
      @close="dialogClose"
      @open="dialogOpen"
      :toolbar="dialogToolbar">

      <i>尝试拖动title</i>

    </i-dialog>
  </div>
</template>

<script>
import ITable from '@/components/common/i-table'
import IDialog from '@/components/common/i-dialog/index.vue'
import { commSortArr } from '@/utils/index.js'

export default {
  components: {
    ITable,
    IDialog
  },
  mounted () {

  },
  data () {
    return {
      dialogVisible: false,
      dialogLoading: false,
      table: {
        data: [],
        toolbar: [
          {
            text: '打开dialog',
            type: 'primary',
            disabled: () => {
              return false
            },
            loading: () => {
              return false
            },
            func: () => {
              this.dialogVisible = true
            }
          },
          {
            text: '按用户年龄排序',
            type: 'primary',
            disabled: () => {
              return false
            },
            loading: () => {
              return false
            },
            func: () => {
              this.sortTable('age')
            }
          }
        ],
        columns: [
          {label: '名称', prop: 'name'},
          {label: '身高', prop: 'height'},
          {label: '年龄', prop: 'age'},
          // {label: '媒体类型', prop: 'media_type', display: {dict: 'DICT_MEDIA_TYPE'}}, // 调用接口转换表格中字典值
          {
            label: '社会身份',
            prop: 'identity',
            display: {
              dictList: [
                {label: '无业游民', value: '1'},
                {label: '军人', value: '2'},
                {label: '党员', value: '3'},
                {label: '共青团员', value: '4'},
                {label: '少先队员', value: '5'}
              ]
            }
          },
          {label: '时间', prop: 'time', display: {date: 'YYYY-MM-DD HH:mm:ss'}}
        ],
        pageInfo: {
          pageIndex: 1,
          pageSize: 10,
          total: 0
        }
      },
      dialogToolbar: [
        {
          text: '确定',
          type: 'primary',
          disabled: () => {
            return this.testDisabled
          },
          loading: () => {
            return this.dialogLoading
          },
          func: (done) => {
            this.dialogLoading = true

            setTimeout(() => {
              this.dialogLoading = false
              this.dialogVisible = false
            }, 500)

            done()
          }
        },
        {
          text: '取消',
          type: '',
          disabled: () => {
            return false
          },
          loading: () => {
            return false
          },
          func: (done) => {
            this.dialogVisible = false
          }
        }
      ]
    }
  },
  methods: {
    searchTable () {
      this.table.data = [
        {uuid: '1', name: 'tom', height: 168, age: 18, identity: '1', time: new Date('2018-01-01 00:00:00')},
        {uuid: '2', name: 'bob', height: 165, age: 24, identity: '2', time: new Date('2019-11-12 12:03:04')},
        {uuid: '3', name: 'mick', height: 190, age: 12, identity: '3', time: new Date('2020-05-13 11:11:11')},
        {uuid: '4', name: 'nick', height: 182, age: 31, identity: '4', time: new Date('2021-12-13 20:08:08')},
        {uuid: '5', name: 'alice', height: 175, age: 16, identity: '5', time: new Date('2022-03-24')}
      ]

      this.table.pageInfo.pageIndex = 1
      this.table.pageInfo.pageSize = 10
      this.table.pageInfo.total = this.table.data.length
    },
    sortTop (row) {
      let currentRowIndex = this.table.data.findIndex(item => {
        return item.uuid === row.uuid
      })

      if (currentRowIndex === 0) {
        return
      }

      let prevRow = this.table.data[currentRowIndex - 1]

      this.table.data.splice(currentRowIndex - 1, 1, row)
      this.table.data.splice(currentRowIndex, 1, prevRow)
    },
    sortTable (prop) {
      this.table.data = commSortArr(this.table.data, prop)
    },
    selectionChange (rows) {
      console.log(rows)
    },
    rowClick (row) {
      console.log('row', row)
    },
    dialogClose () {
      this.dialogVisible = false
    },
    dialogOpen () {
      this.dialogVisible = true
    },
    handleSizeChange (val) {
      console.log(val)
    },
    handleCurrentChange (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss">

</style>
