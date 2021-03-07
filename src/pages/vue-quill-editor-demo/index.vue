<template>
  <div class="container">
    {{formData}}
    <el-table :data="tableData">
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="年龄" prop="age"></el-table-column>
      <el-table-column label="身高" prop="height"></el-table-column>
    </el-table>
    <el-button @click="appendEditor">追加内容</el-button>
    <el-input v-model="appendText" style="width:200px;"></el-input>
    <el-button @click="getHtml">获取内容</el-button>
    <!-- <el-button @click="setFormData">基础表单赋值</el-button>
    <el-button @click="setTableData">表格赋值</el-button> -->
    <div id="editor-container"></div>

    <div id="content" v-html="editorContent"></div>
  </div>
</template>

<script>
import Editor from 'wangeditor'

export default {
  components: {
    Editor
  },
  data () {
    return {
      editor: null,
      appendText: '',
      editorContent: '',
      matchArr: [],
      formData: {
        test1: '这是test1字段值',
        test2: '这是test2字段值',
        test3: '这是test3字段值'
      },
      tableColumn: [
        {label: '姓名', prop: 'name'},
        {label: '年龄', prop: 'age'},
        {label: '身高', prop: 'height'}
      ],
      tableData: [
        {name: 'tom', age: '10', height: '100'},
        {name: 'alice', age: '15', height: '150'},
        {name: 'mick', age: '20', height: '200'}
      ]
    }
  },
  mounted () {
    this.editor = new Editor('#editor-container')
    this.editor.create()
  },
  computed: {
  },
  methods: {
    appendEditor () {
      this.editor.cmd.do('insertText', '$[' + this.appendText + ']$')

      this.appendText = ''
    },
    getHtml () {
      // 替换table表头正则
      let replaceTheadeReg = /<tr><th.*<\/th><\/tr>/g
      // 替换table主体内容正则
      let replaceTableReg = /<table.*<\/table>/g
      // 替换input正则
      let reg = /\$\[[a-zA-Z0-9\u4e00-\u9fa5]*.[a-zA-Z0-9\u4e00-\u9fa5]*\]\$/g
      // 富文本编辑器返回dom结构字符串
      let domStr = this.editor.txt.html()

      console.log(replaceTheadeReg.exec(domStr))
      console.log(domStr)

      domStr = domStr.replace(replaceTableReg, this.replceTable(this.tableData, this.tableColumn))

      this.matchArr = this.editor.txt.html().match(reg) || []

      this.matchArr.forEach(matchItem => {
        let attr = matchItem.slice(2, -2)

        domStr = domStr.replace(matchItem, `<input class="edit-input" define-attr="${attr}" value="${this.formData[attr]}">`)
      })

      this.editorContent = domStr
    },
    replceTable (tableData, tableColumn) {
      let theadStr = ''
      let tbodyStr = ''

      theadStr = tableColumn.map(item => {
        return `<th>${item.label}</th>`
      }).join('')

      theadStr = `<tr>${theadStr}</tr>`

      if (!tableColumn) {
        theadStr = ''
      }

      tbodyStr = tableData.map(item => {
        let tbodyRowKeys = Object.keys(item)
        let str = ''

        tbodyRowKeys.forEach(keyItem => {
          str += `<td><input class="edit-input" value="${item[keyItem]}"></td>`
        })

        return `<tr>${str}</tr>`
      }).join('')

      return `<table class="edit-table" border="0" width="100%" cellpadding="0" cellspacing="0">${theadStr}${tbodyStr}</table>`
    },
    setFormData () {},
    setTableData () {}
  }
}
</script>

<style scoped lang="scss">

.container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 10px;
  padding: 10px;

  #editor-container {
    margin-top: 20px;
  }

  #content {
    height: 300px;
    border: 1px solid #ddd;
    overflow-y: auto;
  }
}
</style>
