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
    url: '/exportDemo/exportFile',
    method: 'post',
    fileConfig: {
      type: 'file',
      fileName: '测试导出文件'
    }
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
