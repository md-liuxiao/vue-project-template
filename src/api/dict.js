import req from 'fetch/index.js'

const config = {
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
