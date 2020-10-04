import axios from 'axios'
import {throwErr} from './throwErr.js'
import store from '../store/index.js'

const qs = require('qs')

/**
 *
 * @param {String} url 请求路径
 * @param {String} method 请求方法
 * @param {Object} params 请求参数
 * @param {Object} requestHeader 请求头
 * @param {Object} fileConfig ---> {type, fileName} 导出配置 ---> 导出类型, 文件名称
 */
const req = function (url, method, params, requestHeader, fileConfig = {}) {
  let instance = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 60000
  })

  // 添加请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  let requestConfig = {
    url: url,
    method: method,
    params: params,
    data: qs.stringify(params),
    headers: {},
    responseType: fileConfig.type === 'file' ? 'blob' : ''
  }

  let getReg = /get|GET/
  let postReg = /post|POST/

  if (getReg.test(requestConfig.method)) {
    delete requestConfig.data
    requestConfig.headers['Content-Type'] = 'application/json'
  } else if (postReg.test(requestConfig.method)) {
    delete requestConfig.params
    requestConfig.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }

  // 添加响应拦截器
  instance.interceptors.response.use(response => {
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(throwErr(response))
    }
  }, error => {
    return Promise.reject(error)
  })

  return instance(requestConfig)
}

export default req
