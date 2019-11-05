import req from 'fetch/index.js'

const config = {
  getData: {
    url: 'www.baidu.com',
    method: 'get'
  }
}

console.log('req', req)

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam)
}

export default request
