<template>
  <div class="i-table-container">
    <el-table
      :data="table.data"
      :border="true"
      :stripe="true">
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
    }
  },
  data () {
    return {}
  },
  methods: {
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
     * @param {String} prop 列名称
     */
    dateFormat (prop) {},

    // 单元格转换方法
    formatter (row, column, cellValue, index) {
      let currentColumn = this.table.columns.filter(item => {
        return item.prop === column.property
      })[0]

      if (currentColumn.display && currentColumn.display.dict) {
        return this.dictFormat(currentColumn.display.dict, cellValue)
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
              }
            }
          }
        }
      }
    }
  }
}
</style>
