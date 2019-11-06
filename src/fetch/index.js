import axios from 'axios'
import {throwErr} from './throwErr.js'

const qs = require('qs')

const req = function (url, method, params, requestHeader) {
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
    headers: {}
  }

  let getReg = /get|GET/
  let postReg = /post|POST/

  if (getReg.test(requestConfig.method)) {
    delete requestConfig.data
    requestConfig['Content-Type'] = 'application/json'
  } else if (postReg.test(requestConfig.method)) {
    delete requestConfig.params
    requestConfig['Content-Type'] = 'application/x-www-form-urlencoded'
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
