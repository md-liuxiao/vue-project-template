<template>
  <div class="container">
    <div class="table-box">
      <i-table
        :table="table"
        selectType="radio">
      </i-table>
    </div>

    <el-button type="primary" @click="exportPdf" class="downBtn">将table转换为pdf导出</el-button>

    <h1>注：如果需要转换的DOM节点中存在img，那么需要解决图片路径的跨域问题(推荐将img标签的src换成base64路径格式更加省时省力)</h1>
  </div>
</template>

<script>
import Html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import ITable from '@/components/common/i-table'

export default {
  components: {
    ITable
  },
  data () {
    return {
      table: {
        data: [],
        toolbar: [],
        columns: [
          {label: '名称', prop: 'name'},
          {label: '身高', prop: 'height'},
          {label: '年龄', prop: 'age'},
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
      }
    }
  },
  mounted () {
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
  methods: {
    exportPdf () {
      new Html2canvas(document.querySelector('.table-box')).then(canvas => {
        var imgWidth = 595.28
        var imgHeight = 592.28 / canvas.width * canvas.height
        // 转换canvas图片
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        // 生成pdf对象
        let pdf = new JsPDF('', 'pt', 'a4')

        pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        // 导出pdf
        pdf.save('table.pdf')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: 10px;
  padding: 10px;

  .downBtn {
    display: block;
    margin: 20px auto 0;
  }

  h1 {
    text-align: center;
    background-image: linear-gradient(to right, #25aae1, #40e495);
    -webkit-background-clip: text;
    color: transparent;
  }
}
</style>
