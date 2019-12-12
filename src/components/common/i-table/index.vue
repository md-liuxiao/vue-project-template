<template>
  <div class="i-table-container">
    <el-table
      ref="table"
      :data="table.data"
      :border="true"
      :stripe="true"
      @selection-change="selectionChange"
      @row-click="rowClick">
      <el-table-column v-if="selectType === 'radio'" align="center" width="45">
        <template slot-scope="scope">
          <el-radio
            v-model="currentRow"
            :label="scope.row"
            @click.native="choosCurrentRow(scope.row)">
            <i></i>
          </el-radio>
        </template>
      </el-table-column>

      <el-table-column
        v-if="selectType === 'selection'"
        type="selection"
        align="center"
        width="45">
      </el-table-column>

      <el-table-column
        v-for="(item, index) in table.columns"
        :label="item.label"
        :prop="item.prop"
        :key="index"
        :formatter="formatter"
        align="center">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    table: {
      type: Object,
      default: () => {
        return {
          data: [],
          columns: [],
          toolbar: []
        }
      }
    },
    /**
     * 表格单选还是多选
     * @param {String} selection 多选
     * @param {String} radio 单选
     */
    selectType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 单选时，保存当前行数据
      currentRow: {}
    }
  },
  methods: {
    /**
     * 表格单选
     * @param {Object} currentRow 选中的行数据
     */
    choosCurrentRow (currentRow) {
      this.$emit('selectionRadioChange', currentRow)
    },

    /**
     * 表格多选
     * @param {Array} selection 选中的行数据
     */
    selectionChange (selection) {
      this.$emit('selectionChange', selection)
    },

    /**
     * 某一行被点击事件
     * @param {Object} row 当前行
     * @param {Object} column 当前行表头
     * @param {Object} event 事件对象
     */
    rowClick (row, column, event) {
      if (this.selectType === 'selection') {
        this.$refs.table.toggleRowSelection(row)
      }

      if (this.selectType === 'radio') {
        this.currentRow = row
      }

      this.$emit('rowClick', row, column, event)
    },

    /**
     * 通过请求字典来转换单元格字段
     * @param {String} prop 列名称
     * @param {String} value 字典value
     */
    dictFormat (dictName, value) {
      return this.dictDatas[dictName].filter(item => {
        return item.value === value
      })[0].label
    },

    /**
     * 对时间格式的数据进行统一转换处理
     * @param {String} dateName date格式转换规则
     * @param {String} value 当前单元格的值
     */
    dateFormat (dateName, value) {
      if (value) {
        let date = new Date(value)
        return moment(date).format(dateName)
      } else {
        return value
      }
    },

    // 单元格转换方法
    formatter (row, column, cellValue, index) {
      let currentColumn = this.table.columns.filter(item => {
        return item.prop === column.property
      })[0]

      if (currentColumn.display && currentColumn.display.dict) {
        return this.dictFormat(currentColumn.display.dict, cellValue)
      } else if (currentColumn.display && currentColumn.display.date) {
        return this.dateFormat(currentColumn.display.date, cellValue)
      } else {
        return cellValue
      }
    },

    // 获取表格中所有需要加载的字典名，并且同步获取到字典列表放在vuex中
    handlerDictDatas () {
      let list = this.table.columns.reduce((prev, current) => {
        if (current.display && current.display.dict) {
          prev.push(current.display.dict)

          return prev
        } else {
          return prev
        }
      }, [])

      let reqList = list.map(item => {
        return this.$d(item)
      })

      Promise.all(reqList).then(datas => {
        datas.forEach((item, index) => {
          this.$store.commit('changeDictDatas', {dictName: list[index], dictData: item})
        })

        this.$emit('search')
      })
    }
  },
  computed: {
    dictDatas () {
      return this.$store.state.dictDatas
    }
  },
  created () {
    this.handlerDictDatas()
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.i-table-container {
  /deep/ .el-table {
    // thead
    .el-table__header-wrapper {
      .el-table__header {
        thead {
          tr {
            th {
              padding: 0;
              height: 35px;
              color: #333333;
              background: #F2F2F2;

              .cell {
                padding: 0;
                height: 100%;
                line-height: 35px;
              }
            }
          }
        }
      }
    }

    // tbody
    .el-table__body-wrapper {
      .el-table__body {
        tbody {
          tr {
            td {
              padding: 0;
              height: 35px;

              .cell {
                padding: 0;
                height: 100%;
                line-height: 35px;

                .el-radio {
                  .el-radio__label {
                    padding: 0;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
