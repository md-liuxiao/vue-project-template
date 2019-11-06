import req from 'fetch/index.js'

const config = {
  getData: {
    url: '/dccc/environment/getAbnormalList',
    method: 'get'
  },
  getPostData: {
    url: '/dccc/user/login',
    method: 'post'
  }
}

const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam)
}
export default request
