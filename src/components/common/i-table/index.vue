<template>
  <div class="i-table-container">
    <!-- 按钮 -->
    <div class="i-table-toolbar">
      <el-button
        v-for="(item, index) in table.toolbar"
        :key="index"
        :type="item.type"
        :disabled="item.disabled ? item.disabled() : false"
        :loading="item.loading ? item.loading() : false"
        @click="toolbarBtnClick(item)">

        {{item.text}}

      </el-button>
    </div>

    <!-- 表格 -->
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

    <!-- 分页 -->
    <div class="i-pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100, 200]"
        :page-size="table.pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="table.pageInfo.total"
        background>
      </el-pagination>
    </div>
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
          toolbar: [],
          pageInfo: {
            pageIndex: 1,
            pageSize: 10,
            total: 0
          }
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
      currentRow: {},
      // 选择页码时，保存当前页码
      currentPage: 1
    }
  },
  methods: {
    /**
     * 表格按钮点击事件
     * @param {Object} btn 按钮信息
     * @param {String} btn.text 按钮文字内容
     * @param {String} btn.type 按钮类型
     * @param {Function} btn.loading loading按钮
     * @param {Function} btn.disabled 禁用按钮
     * @param {Function} btn.func 点击时触发的方法
     */
    toolbarBtnClick (btn) {
      if (btn.func) {
        btn.func()
      }
    },
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
    },

    /**
     * 改变每页条数
     * @param {String} value 当前页展示条数
     */
    handleSizeChange (value) {
      this.$emit('handleSizeChange', value)

      this.$emit('search')
    },

    /**
     * 改变页码
     * @param {String} value 当前页码
     */
    handleCurrentChange (value) {
      this.$emit('handleCurrentChange', value)

      this.$emit('search')
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
@import "./index.scss";
</style>
