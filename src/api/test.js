import req from 'fetch/index.js'

const config = {
  portExport: {
    url: '/api/media/stimulate/exportExcel',
    method: 'post',
    fileConfig: {
      type: 'file',
      fileName: '销售激励报表'
    }
  },
  getMediaType: {
    url: '/dicts/DICT_MEDIA_TYPE',
    method: 'get'
  },
  getCardType: {
    url: '/dicts/DICT_CARD_TYPE',
    method: 'get'
  },
  getTableData: {
    url: '/api/getTableData',
    method: 'get'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
