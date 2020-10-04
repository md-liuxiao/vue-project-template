import req from 'fetch/index.js'

const config = {
  postExport: {
    url: '/demo/postExport',
    method: 'post',
    fileConfig: {
      type: 'file',
      fileName: '测试导出报表', // 暂时用不到
      excelType: 'xlsx' // 暂时用不到
    }
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}

export default request
