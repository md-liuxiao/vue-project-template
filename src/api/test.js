import req from 'fetch/index.js'

const config = {
  getData: {
    url: '/dccc/environment/getAbnormalList',
    method: 'get'
  },
  getPostData: {
    url: '/exportDemo/test',
    method: 'post'
  },
  portExport: {
    url: '/api/media/stimulate/exportExcel',
    method: 'post',
    fileConfig: {
      type: 'file',
      fileName: '销售激励报表'
    }
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
